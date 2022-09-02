import { Box } from "@chakra-ui/react";
import React from "react";
import PendingOrders from "../components/PendingOrders";

const Orders = () => {
  return (
    <Box backgroundColor={"white"} p="10">
      <Box fontSize={"2xl"} fontWeight={"bold"}>
        Your Order History:
      </Box>
      <PendingOrders />
    </Box>
  );
};

export default Orders;
