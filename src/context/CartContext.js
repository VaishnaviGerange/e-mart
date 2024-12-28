// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const userId = 1; // Simulating a user ID for the API

//   useEffect(() => {
//     // Fetch cart data for the user when the app loads
//     async function fetchCart() {
//       try {
//         const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
//         const data = await response.json();
//         if (data.length > 0) {
//           setCart(data[0].products);
//         }
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     }
//     fetchCart();
//   }, []);

//   const addToCart = async (productId) => {
//     try {
//       const existingProduct = cart.find((item) => item.productId === productId);
//       let updatedCart;

//       if (existingProduct) {
//         // Update quantity for existing product
//         updatedCart = cart.map((item) =>
//           item.productId === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new product to the cart
//         updatedCart = [...cart, { productId, quantity: 1 }];
//       }

//       // Save the updated cart via API
//       await fetch(`https://fakestoreapi.com/carts/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           date: new Date().toISOString(),
//           products: updatedCart,
//         }),
//       });

//       setCart(updatedCart);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const updateQuantity = async (productId, quantity) => {
//     try {
//       let updatedCart = cart
//         .map((item) =>
//           item.productId === productId ? { ...item, quantity } : item
//         )
//         .filter((item) => item.quantity > 0); // Remove items with zero quantity

//       await fetch(`https://fakestoreapi.com/carts/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           date: new Date().toISOString(),
//           products: updatedCart,
//         }),
//       });

//       setCart(updatedCart);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       const updatedCart = cart.filter((item) => item.productId !== productId);

//       // Remove product from the cart via API
//       await fetch(`https://fakestoreapi.com/carts/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           date: new Date().toISOString(),
//           products: updatedCart,
//         }),
//       });

//       setCart(updatedCart);
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   };

//   const getTotalItems = () =>
//     cart.reduce((total, item) => total + item.quantity, 0);

//   const getTotalPrice = async () => {
//     try {
//       const responses = await Promise.all(
//         cart.map((item) =>
//           fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
//             (res) => res.json()
//           )
//         )
//       );
//       return responses.reduce(
//         (total, product, index) =>
//           total + product.price * cart[index].quantity,
//         0
//       );
//     } catch (error) {
//       console.error("Error calculating total price:", error);
//       return 0;
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         getTotalItems,
//         getTotalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = 1; // Simulating a user ID for the API
  const initializeWithEmptyCart = true; // Set this to `true` to start with an empty cart

  useEffect(() => {
    async function fetchCart() {
      try {
        if (!initializeWithEmptyCart) {
          const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
          const data = await response.json();
          if (data.length > 0) {
            setCart(data[0].products);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      const existingProduct = cart.find((item) => item.productId === productId);
      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { productId, quantity: 1 }];
      }

      await fetch(`https://fakestoreapi.com/carts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: updatedCart,
        }),
      });

      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      let updatedCart = cart
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0);

      await fetch(`https://fakestoreapi.com/carts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: updatedCart,
        }),
      });

      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.productId !== productId);

      await fetch(`https://fakestoreapi.com/carts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: updatedCart,
        }),
      });

      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = async () => {
    try {
      const responses = await Promise.all(
        cart.map((item) =>
          fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
            (res) => res.json()
          )
        )
      );
      return responses.reduce(
        (total, product, index) =>
          total + product.price * cart[index].quantity,
        0
      );
    } catch (error) {
      console.error("Error calculating total price:", error);
      return 0;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
