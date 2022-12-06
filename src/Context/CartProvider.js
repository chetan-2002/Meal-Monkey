import axios from "axios";
import React, { createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState({});
  const [user, setUser] = React.useState(null);
  const [shippingInfo, setShippingInfo] = React.useState({});
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      axios
        .post(
          "https://meal-monkey-backend.onrender.com/api/cart/getCartItems",
          { userId: userInfo._id },
          configuration
        )
        .then((res) => {
          setCart(res.data);
          // localStorage.setItem("cart", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        user,
        setUser,
        shippingInfo,
        setShippingInfo,
        orderPlaced,
        setOrderPlaced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return React.useContext(CartContext);
};
export default CartProvider;

//https://meal-monkey-backend.herokuapp.com/
