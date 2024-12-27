import React from 'react';
import Link from 'next/link'; // Import Link component from Next.js
import { useCart } from '../../context/CartContext'; // Corrected relative import path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Example of cart icon


const Navbar = ({ search, setSearch, selectedCategory, setSelectedCategory, categories }) => {
  // Destructure cart-related functions from useCart
  const { cart, getTotalItems } = useCart(); // Get cart and total items in the cart

  // Ensure categories is always an array
  categories = categories || [];

  return (
    <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
  {/* Logo image */}
  <img 
    src="/e.jpg" 
    alt="E-MART Logo" 
    className="w-14 h-14 rounded-full" // Adjust size and styling as needed
  />
  {/* Site Name */}
  <div className="text-3xl font-bold">E-MART!</div>
</div>


        {/* Search bar and Category filter */}
        <div className="flex space-x-4">
          {/* Search input with image */}
          <div className="relative">
            <img
              src="/search.png"
              alt="Search"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-96 pr-12 text-black" // Add text-black for visibility
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded bg-gray-500 text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* User and Cart options */}
        <div className="flex space-x-4 items-center">
        <div className="flex items-center space-x-4">
          {/* Home button */}
          <Link href="/" className="text-l font-bold hover:text-gray-400">
            Home
          </Link>
          
        </div>
          <div className=" text-l font-bold cursor-pointer">User</div>
          <div className=" text-l font-bold cursor-pointer flex items-center space-x-2">
            {/* <span>Cart</span> */}
            {/* Display the total number of items in the cart */}
           
            {/* Cart icon with Link to Cart Page */}
            <Link href="/cart" className="bg-gray-800 p-1 rounded">
            <FontAwesomeIcon icon={faShoppingCart} className="w-7 h-5" />
              {/* <img
                src="/cart.png"
                alt="Cart"
                className="w-5 h-5"
              /> */}
            
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {getTotalItems()} {/* Display total items in cart */}
            </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default props for Navbar component
Navbar.defaultProps = {
  categories: [], // Ensure categories is always an array
};

export default Navbar;
