import { render, screen, fireEvent, waitFor, within, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios';
import Product from './Components/ProductInfo/Product';
import Cart from './Components/Cart/Cart';
import { useLocation, Link } from 'react-router-dom';

jest.mock('axios');



test('should render a list of products with correct elements', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      short_description: 'Short description 1',
      price: 10.99,
      image_link: 'https://example.com/image1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      short_description: 'Short description 2',
      price: 20.99,
      image_link: 'https://example.com/image2.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      short_description: 'Short description 3',
      price: 30.99,
      image_link: 'https://example.com/image3.jpg'
    }
  ];

  // Mock axios.get() to return the mockProducts
  axios.get.mockResolvedValueOnce({ data: mockProducts });

  render(<App />);

  // Wait for the mockProducts to be loaded and rendered
  const productElements = await screen.findAllByRole('listitem');

  expect(productElements.length).toEqual(mockProducts.length);

  // Check that each product has the expected elements
  productElements.forEach((productElement, index) => {
    const product = mockProducts[index];

    expect(productElement).toHaveTextContent(product.name);
    expect(productElement).toHaveTextContent(product.short_description);
    expect(productElement).toHaveTextContent(`Price: $${product.price}`);
    // expect(productElement).toHaveAttribute('src', product.image_link);
    // expect(productElement).toHaveAttribute('alt', product.name);

    const quantityInput = within(productElement).getByRole('spinbutton');
    expect(quantityInput).toHaveValue(1);

    const addToCartButton = within(productElement).getByRole('button');
    expect(addToCartButton).toHaveTextContent('Add To Cart');
  });
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

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );
});

test('renders the "Return to shopping" button', () => {
  render(<MemoryRouter>
    <Cart />
  </MemoryRouter>)
  const button = screen.getByText('Return to shopping');
  expect(button).toBeInTheDocument();
});


test('renders the cart items when the cart array is not empty', () => {
  const cart = { id: 2, name: 'Pants', price: 30, totalprice: 60, quantity: 2, image_link: 'pants.png' };
  render(<MemoryRouter>
    <Cart />
  </MemoryRouter>, { initialProps: { cart } });
  screen.debug();

  expect(screen.getByText('Pants')).toBeInTheDocument();
});

test('shows the message "Oops! Your Cart is empty" when the cart array is empty', () => {
  render(<MemoryRouter>
    <Cart />
  </MemoryRouter>)
  const message = screen.getByText('Oops! Your Cart is empty');
  expect(message).toBeInTheDocument();
});

test('renders the "Checkout" button when the cart array is not empty', () => {
  const cart = [{ id: 1, name: 'Shirt', price: 20, totalprice: 40, quantity: 2, image_link: 'shirt.png' },];
  render(<MemoryRouter>
    <Cart />
  </MemoryRouter>, { initialProps: { cart } });
  const button = screen.getByText('Checkout');
  expect(button).toBeInTheDocument();
});


test('calculates the total price correctly', () => {
  const cart = [
    { id: 1, name: 'Shirt', price: 20, totalprice: 40, quantity: 2, image_link: 'shirt.png' },
    { id: 2, name: 'Pants', price: 30, totalprice: 60, quantity: 2, image_link: 'pants.png' },
  ];
  render(<MemoryRouter>
    <Cart />
  </MemoryRouter>, { initialProps: { cart } });
  const totalPrice = cart.reduce((total, item) => total + item.totalprice, 0);
  const totalPriceElement = screen.getByText(`Total Price: $${totalPrice}`);
  expect(totalPriceElement).toBeInTheDocument();
});


const cart = [
  {
    id: 1,
    name: 'Product 1',
    price: 10.99,
    totalprice: 10.99,
    quantity: 1,
    image_link: 'https://example.com/product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20.99,
    totalprice: 20.99,
    quantity: 1,
    image_link: 'https://example.com/product2.jpg',
  },
];


test('should decrease the quantity of a product when the "-" button is clicked', async () => {
  const updateCart = jest.fn();
  render(
    <MemoryRouter>
      <Cart cart={cart} updateCart={updateCart} />
    </MemoryRouter>
  )
});






test('removes item from cart', async () => {
  axios.delete.mockResolvedValueOnce({});

  const { getByLabelText, getByText } = render(
   
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  ,
      {
          state: {
              cart: [
                  {
                      id: 1,
                      name: 'Product 1',
                      price: 10,
                      quantity: 2,
                      totalprice: 20,
                      image_link: 'https://example.com/product1.jpg',
                  },
              ],
          },
      }
  );

  fireEvent.click(getByLabelText(/remove item/i));

  expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8081/orders/delete_order?id=1');

  await waitFor(() => {
      expect(getByText(/oops/i)).toBeInTheDocument();
  });
});

