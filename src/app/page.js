"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; // Adjust the path if needed
import Link from 'next/link';
import Footer from './components/Footer'; // Import Footer

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // State to store sorting criteria

  useEffect(() => {
    async function fetchData() {
      const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
      const categories = await fetch('https://fakestoreapi.com/products/categories').then((res) => res.json());
      setProducts(products);
      setFilteredProducts(products);
      setCategories(categories);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting based on selected criteria
    if (sortOrder) {
      if (sortOrder === 'price-low-to-high') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'price-high-to-low') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (sortOrder === 'rating-high-to-low') {
        filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-auto bg-blue-100 pt-20"> {/* Add padding to avoid content being hidden under navbar */}
        {/* Sort Control */}
        <div className="bg-green-100 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <span className="font-semibold text-gray-700">Sort Products By:</span>
            <select
              className="border p-2 rounded bg-green-200"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Select</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="rating-high-to-low">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredProducts.map((product) => (
            <Link href={`/productdetails/${product.id}`} key={product.id}>
              <div className="border bg-gray-100 p-4 rounded shadow">
                <img src={product.image} alt={product.title} className="h-40 mx-auto" />
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-sm text-gray-500">Rating: {product.rating.rate}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer /> {/* Footer will always stay at the bottom */}
    </div>
  );
}

