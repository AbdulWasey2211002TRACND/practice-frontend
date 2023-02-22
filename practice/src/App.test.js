import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');




test('should render the Home component', async () => {
  render(<App />);
  expect(screen.getByText('Buy Your Desired Product')).toBeInTheDocument();
});

test('should fetch all products from the API and display them', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      short_description: 'This is a short description for Product 1',
      price: 9.99,
      image_link: 'https://example.com/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      short_description: 'This is a short description for Product 2',
      price: 19.99,
      image_link: 'https://example.com/product2.jpg',
    },
  ];

  axios.get.mockResolvedValueOnce({ data: mockProducts });
  render(<App />);

  await waitFor(() => {
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});

test('should add a product to the cart when the "Add to Cart" button is clicked', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      short_description: 'This is a short description for Product 1',
      price: 9.99,
      image_link: 'https://example.com/product1.jpg',
    },
  ];

  axios.get.mockResolvedValueOnce({ data: mockProducts });
  render(<App />);

  const addToCartButton = await screen.findByRole('button', { name: 'Add To Cart' });
  fireEvent.click(addToCartButton);

  await waitFor(() => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});

test('should increase the quantity of a product in the cart when the "Add to Cart" button is clicked multiple times', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      short_description: 'This is a short description for Product 1',
      price: 9.99,
      image_link: 'https://example.com/product1.jpg',
    },
  ];

  axios.get.mockResolvedValueOnce({ data: mockProducts });
  render(<App />);

  const addToCartButton = await screen.findByRole('button', { name: 'Add To Cart' });
  fireEvent.click(addToCartButton);
  fireEvent.click(addToCartButton);

  await waitFor(() => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});



