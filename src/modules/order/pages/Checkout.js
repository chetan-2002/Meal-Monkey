import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import ShippingInformation from "../components/ShippingInformation";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../../Context/CartProvider";
const Checkout = () => {
  const { orderPlaced, setOrderPlaced } = CartState();
  const navigate = useNavigate();
  useEffect(() => {
    if (orderPlaced) {
      setOrderPlaced(false);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      backgroundColor={"white"}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
    >
      <ShippingInformation />
      <OrderSummary />
    </Box>
  );
};

export default Checkout;
