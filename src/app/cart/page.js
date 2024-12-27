"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Ensure cart is always an array and products are fetched only when cart has items
  useEffect(() => {
    async function fetchProducts() {
      if (cart.length > 0) {
        const responses = await Promise.all(
          cart.map((item) =>
            fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
              (res) => res.json()
            )
          )
        );
        setProducts(responses);
      }
    }
    fetchProducts();
  }, [cart]);

  // Fetch total price asynchronously and update state
  useEffect(() => {
    async function calculateTotalPrice() {
      const price = await getTotalPrice();
      setTotalPrice(price);
    }
    calculateTotalPrice();
  }, [cart, getTotalPrice]);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar categories={[]} /> {/* Pass an empty array for categories if not used in CartPage */}
        <div className="bg-blue-100 pt-24 min-h-screen"> {/* Add padding-top to avoid navbar overlap */}
          <div className="container mx-auto p-6 relative">
            {/* Shopping Cart Heading centered */}
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

            {/* Total Section - Positioned at the top-right */}
            <div className="absolute top-20 right-10 mt-6 mr-6 text-lg font-semibold text-gray-800">
              <p>Total Items: <span className="font-bold">{getTotalItems()}</span></p>
              <p>Total Price: <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span></p>
            </div>

            {/* Proceed to Checkout Button */}
            <div className="absolute top-24 right-7 mt-20 mr-6 w-full flex justify-end">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
                Proceed to Checkout
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty!</p>
            ) : (
              <div>
                {products.length === 0 ? (
                  <p className="text-center">Loading products...</p>
                ) : (
                  <div className="space-y-6">
                    {products.map((product, index) => {
                      const cartItem = cart[index];
                      if (!cartItem) return null; // Safeguard against undefined cart item

                      return (
                        <div key={product.id} className="border bg-gray-100 p-4 rounded shadow">
                          <div className="flex flex-col sm:flex-row items-center space-x-4 p-4 border-b mb-4">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-40 mb-4 sm:mb-0 sm:w-48"
                            />
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold">{product.title}</h2>
                              <p className="text-gray-700">${product.price}</p>
                              <div className="flex items-center space-x-4 mt-4">
                                <button
                                  onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)}
                                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                                >
                                  -
                                </button>
                                <span className="text-lg">{cartItem.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}
                                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                                >
                                  +
                                </button>
                                {/* Remove from Cart */}
                                <button
                                  onClick={() => removeFromCart(cartItem.productId)}
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
