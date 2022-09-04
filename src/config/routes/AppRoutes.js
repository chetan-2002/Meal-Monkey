import React from "react";
import { Route, Routes } from "react-router-dom";
import Checkout from "../../modules/order/pages/Checkout";
import Orders from "../../modules/order/pages/Orders";
import Products from "../../modules/products/pages/Products";
import ConfirmEmail from "../../shared/widgets/ConfirmEmail";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} exact />
      <Route path="/checkout" element={<Checkout />} exact />
      <Route path="/orders" element={<Orders />} exact></Route>
      <Route path="/verify/:id/:token" element={<ConfirmEmail />} exact></Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AppRoutes;
