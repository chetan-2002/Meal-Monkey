import React from "react";
import { Route, Routes } from "react-router-dom";
import Checkout from "../../modules/order/pages/Checkout";
import Orders from "../../modules/order/pages/Orders";
import Products from "../../modules/products/pages/Products";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/menu" element={<Products />} exact />
      <Route path="/checkout" element={<Checkout />} exact />
      <Route path="/orders" element={<Orders />} exact></Route>
    </Routes>
  );
};

export default AppRoutes;
