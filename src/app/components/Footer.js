"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Name/Logo */}
          <div className="mb-4 md:mb-0">
            {/* <h1 className="text-3xl font-semibold">E-MART!</h1> */}
            <div className="flex items-center space-x-4">
  {/* Logo image */}
  <img 
    src="/e.jpg" 
    alt="E-MART Logo" 
    className="w-10 h-10 rounded-full" 
  />
  {/* Site Name */}
  <div className="text-2xl font-bold">E-MART!</div>
</div>
            <p className="text-gray-400 mt-2">Your one-stop shop for all things awesome!</p>
          </div>
<div className="mt-10 items-center">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-center space-x-4 mb-4 md:mb-0">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white">Shop</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Copyright and Newsletter Section */}
        <div className="text-end text-gray-400 mt-6">
          <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.</p>
          <p>Designed with 💙 by Vaishanvi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
