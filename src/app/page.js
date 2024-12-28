"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Footer from "./components/Footer";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetch("https://fakestoreapi.com/products").then((res) => res.json()),
          fetch("https://fakestoreapi.com/products/categories").then((res) => res.json()),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
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

    if (sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortOrder === "price-low-to-high") return a.price - b.price;
        if (sortOrder === "price-high-to-low") return b.price - a.price;
        if (sortOrder === "rating-high-to-low") return b.rating.rate - a.rating.rate;
      });
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, sortOrder, products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        search={search}
        setSearch={(value) => setSearch(value)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="flex-1 overflow-auto bg-blue-100 pt-20">
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

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredProducts.map((product) => (
              <Link href={`/productdetails/${product.id}`} key={product.id}>
                <div className="border bg-gray-100 p-4 rounded shadow">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="h-40 mx-auto object-contain"
                    loading="lazy"
                  />
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-gray-700">${product.price}</p>
                  <p className="text-sm text-gray-500">Rating: {product.rating.rate}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

