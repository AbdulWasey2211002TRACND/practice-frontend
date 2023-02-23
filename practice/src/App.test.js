import { render, screen, fireEvent, waitFor, within, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import axios from 'axios';
import Product from './Components/ProductInfo/Product';
import Cart from './Components/Cart/Cart';
import { useLocation, Link } from 'react-router-dom';
import Confirmation from './Components/Confirmation/Confirmation';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: [] })),
  delete: jest.fn(() => Promise.resolve({ data: [] })),
}));


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





test('displays Start over button', () => {
  render(<MemoryRouter>
    <Confirmation />
  </MemoryRouter>);
  const imageElement = screen.getByText('Start Over');
  expect(imageElement).toBeInTheDocument('Start Over');
});


test('renders without throwing an error', () => {
  render(
    <MemoryRouter>
      <Product />
    </MemoryRouter>
  );
});

const product = {
  id: 1,
  name: 'Product 1',
  short_description: 'Short description',
  long_description: 'Long description',
  price: 10,
  image_link: 'https://example.com/image.jpg',
};

test('displays the correct product details', async () => {
  const response = { data: product };
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(response),
  });

  render(
    <MemoryRouter initialEntries={[{ state: { id: product.id } }]}>
      <Product />
    </MemoryRouter>
  );

  expect(await screen.findByText(product.name)).toBeInTheDocument();
  expect(screen.getByText(product.short_description)).toBeInTheDocument();
  expect(screen.getByText(product.long_description)).toBeInTheDocument();
  expect(screen.getByText(`Price: $${product.price}`)).toBeInTheDocument();
  expect(screen.getByTestId('quantity')).toHaveValue(1);
});

test('updates the quantity state when the quantity input changes', () => {
  render(
    <MemoryRouter initialEntries={[{ state: { id: product.id } }]}>
      <Product />
    </MemoryRouter>
  );

  const quantityInput = screen.getByTestId('quantity');
  fireEvent.change(quantityInput, { target: { value: 2 } });
  expect(quantityInput).toHaveValue(2);
});


test('displays the correct product details', async () => {
  axios.get.mockResolvedValueOnce({ data: product });

  render(
    <MemoryRouter initialEntries={[{ state: { id: product.id } }]}>
      <Product />
    </MemoryRouter>
  );

  expect(await screen.findByText(product.name)).toBeInTheDocument();
  expect(await screen.findByText(product.short_description)).toBeInTheDocument();
  expect(await screen.findByText(product.long_description)).toBeInTheDocument();
  expect(await screen.findByText(`Price: $${product.price}`)).toBeInTheDocument();
  expect(await screen.findByRole('img', { src: product.image_link })).toBeInTheDocument();
});


test('updates the quantity state when the user enters a value', async () => {
  axios.get.mockResolvedValueOnce({ data: product });

  render(
    <MemoryRouter initialEntries={[{ state: { id: product.id } }]}>
      <Product />
    </MemoryRouter>
  );

  const quantityInput = await screen.findByTestId('quantity');
  fireEvent.change(quantityInput, { target: { value: '5' } });

  expect(quantityInput).toHaveValue('5');
});


test('passes correct data to Cart page when Add To Cart button is clicked', () => {
  const productId = 1;
  const mockProduct = {
    id: productId,
    name: 'Product Name',
    short_description: 'Short Description',
    long_description: 'Long Description',
    price: 10.99,
    image_link: 'http://example.com/image.jpg'
  };
  axios.get.mockResolvedValueOnce({ data: mockProduct });
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter initialEntries={[{ state: { id: productId } }]}>
      <Product />
    </MemoryRouter>
  );
  const quantityInput = getByPlaceholderText('quantity');
  fireEvent.change(quantityInput, { target: { value: '2' } });
  const addToCartButton = getByText('Add To Cart');
  fireEvent.click(addToCartButton);
  expect(mockNavigate).toHaveBeenCalledWith('/Cart', {
    state: {
      id: mockProduct.id,
      quantity: 2,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.image_link
    }
  })});


  test('displays products in the cart', () => {
    const cartData = [    { id: 1, name: 'Product 1', price: 10, quantity: 2, totalprice: 20, image_link: 'http://example.com/image1.jpg' },    { id: 2, name: 'Product 2', price: 15, quantity: 1, totalprice: 15, image_link: 'http://example.com/image2.jpg' },  ];
    const { getByText } = render(<MemoryRouter>
      <Cart />
    </MemoryRouter>, { 
      initialProps: { 
        location: { 
          state: { 
            cart: cartData
          } 
        } 
      } 
    });
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('$15')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('$15')).toBeInTheDocument();
  });


  test('removes product from the cart', async () => {
    const cartData = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2, totalprice: 20, image_link: 'http://example.com/image1.jpg' },
      { id: 2, name: 'Product 2', price: 15, quantity: 1, totalprice: 15, image_link: 'http://example.com/image2.jpg' },
    ];
    const { getByText, queryByText } = render(<MemoryRouter>
      <Cart />
    </MemoryRouter>, { 
      initialProps: { 
        location: { 
          state: { 
            cart: cartData
          } 
        } 
      } 
    });
    const removeButton = getByText('Remove Item');
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(queryByText('Product 1')).not.toBeInTheDocument();
      expect(queryByText('$10')).not.toBeInTheDocument();
      expect(queryByText('2')).not.toBeInTheDocument();
      expect(queryByText('$20')).not.toBeInTheDocument();
    });
  });



 
test('renders cart with products', () => {
  const cart = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2, totalprice: 20, image_link: 'https://example.com/image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, totalprice: 20, image_link: 'https://example.com/image2.jpg' }
  ];

  render(
    <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
      <Cart location={{ state: { cart } }} />
    </MemoryRouter>
  );

  expect(screen.getByText('Your Cart')).toBeInTheDocument();
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
});

test('renders cart without products', () => {
  render(
    <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
      <Cart />
    </MemoryRouter>
  );

  expect(screen.getByText('Oops! Your Cart is empty')).toBeInTheDocument();
});

