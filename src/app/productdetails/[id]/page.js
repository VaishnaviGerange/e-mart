"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';  // Next.js Image component for optimization

const ProductDetails = () => {
    const params = useParams();
    const [id, setId] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Navbar state
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Men', 'Women', 'Electronics', 'Furniture', 'Books'];

    const { addToCart } = useCart(); // Access addToCart from CartContext
    const router = useRouter(); // Use router for navigation

    useEffect(() => {
        if (params) {
            const { id } = params;
            setId(id);
        }
    }, [params]);

    useEffect(() => {
        if (id) {
            setLoading(true); // Set loading state to true before fetch
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false); // Set loading state to false when data is fetched
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (product) {
            await addToCart(product.id); // Add the product to the cart
            router.push('/cart'); 
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories || []} // Ensure categories is always an array
            />

            <div className="flex-1 overflow-auto pt-24 bg-blue-100"> {/* Adjust padding-top to avoid navbar overlap */}
                <div className="container mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#e8e6e4] rounded-lg shadow-md p-6">
                        {/* Product Image */}
                        <div className="flex justify-center">
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="w-full md:w-3/4 lg:w-2/3 max-h-[500px] object-contain"
                                width={500} // Define width and height for better optimization
                                height={500}
                                priority
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                            <p className="text-gray-700 text-lg">{product.description}</p>
                            <p className="text-xl font-semibold text-green-600">Price: ${product.price}</p>
                            <p className="text-gray-600">Category: {product.category}</p>
                            <div className="flex items-center space-x-2">
                                <p className="text-yellow-600 text-lg font-semibold">Rating: {product.rating.rate}</p>
                                <p className="text-gray-500">({product.rating.count} reviews)</p>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ProductDetails;
