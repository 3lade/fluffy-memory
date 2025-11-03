import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import App from '../App'; 
import Home from '../components/Home';
import productsData from '../components/productsData';
import Cart from '../components/Cart';



const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('App Component', () => {
    test('checks_if_the_App_renders_correctly', () => {
      render(<App />);
      const titleElement = screen.getAllByText(/ElectroGadgets/i); 
      expect(titleElement.length).toBeGreaterThan(0);
    });

  test('renders_the_title_ElectroGadgets_in_navbar', () => {
    renderWithRouter(<NavBar />);
    const titleElement = screen.getByText(/ElectroGadgets/i); 
    expect(titleElement).toBeInTheDocument(); 
  });

  test('renders_all_navigation_links_with_correct_paths', () => {
    renderWithRouter(<NavBar />);

    const projectsLink = screen.getByText(/Home/i);
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.closest('a')).toHaveAttribute('href', '/'); 

    const contactLink = screen.getByText(/Cart/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/cart'); 
  });

  test('ensures_the_correct_routes_are_rendered_on_clicking_nav_home', () => {
    render(<App />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    const projectsLink = screen.getByText("Cart");
    userEvent.click(projectsLink);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

test('checks_adds_product_1_to_cart', () => {
  render(<App />);

  const homeLink = screen.getByText("Home");
  userEvent.click(homeLink);

  const addToCartButton = screen.getAllByText(/Add to Cart/i)[0];
  userEvent.click(addToCartButton);
  
  const cartLink = screen.getByText("Cart");
  userEvent.click(cartLink);
  
  const productName = productsData[0].name;
  const productInCart = screen.getByText(new RegExp(productName, 'i')); 
  expect(productInCart).toBeInTheDocument();
});

test('checks_adds_product_2_to_cart', () => {
  render(<App />);

  const homeLink = screen.getByText("Home");
  userEvent.click(homeLink);

  const addToCartButton = screen.getAllByText(/Add to Cart/i)[1];
  userEvent.click(addToCartButton);
  
  const cartLink = screen.getByText("Cart");
  userEvent.click(cartLink);
  
  const productName = productsData[1].name;
  const productInCart = screen.getByText(new RegExp(productName, 'i')); 
  expect(productInCart).toBeInTheDocument();
});


test('checks_adds_product_3_to_cart_and_clear_cart', () => {
  render(<App />);

  const homeLink = screen.getByText("Home");
  userEvent.click(homeLink);

  const addToCartButton = screen.getAllByText(/Add to Cart/i)[2];
  userEvent.click(addToCartButton);
  
  const cartLink = screen.getByText("Cart");
  userEvent.click(cartLink);
  
  const productName = productsData[2].name;
  const productInCart = screen.getByText(new RegExp(productName, 'i')); 
  expect(productInCart).toBeInTheDocument();

  const clearcart = screen.getByText("Clear Cart");
  userEvent.click(clearcart);
});

test('renders_cart_with_heading_correctly', () => {
  renderWithRouter(<Cart />);
   const emptyCartMessage = screen.getByText("Your Cart");
  expect(emptyCartMessage).toBeInTheDocument();
});

test('adds_products_to_cart_and_checks_price_displays', () => {
  render(<App />);
  
  const homeLink = screen.getByText("Home");
  userEvent.click(homeLink);

  const addToCartButton = screen.getAllByText(/Add to Cart/i)[0];
  userEvent.click(addToCartButton);
  
  // Navigate to Cart page
  const cartLink = screen.getByText("Cart");
  userEvent.click(cartLink);
  
  const productName = productsData[0].name;
  const productInCart = screen.getByText(new RegExp(productName, 'i')); 
  expect(productInCart).toBeInTheDocument();

  const totalPrice = screen.getByText(/Total/i);
  expect(totalPrice).toBeInTheDocument();
});

});
