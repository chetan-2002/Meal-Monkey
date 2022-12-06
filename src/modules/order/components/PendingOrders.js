import React, { useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { CartState } from "../../../Context/CartProvider";
const PendingOrders = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();
  const { user } = CartState();
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/order/getOrderByUser",
        { userId: user?._id },
        config
      )
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error Fetching Orders",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <Box py={5}>
      <Box fontSize={"xl"} fontWeight={"semibold"}>
        Pending Orders (Latest First) :
      </Box>
      {loading ? (
        <Box
          py={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner></Spinner>
        </Box>
      ) : (
        <>
          {orders?.length > 0 ? (
            <TableContainer py={4}>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>Order Invoice Date</Th>
                    <Th>Payment Type</Th>
                    <Th>Payment Status</Th>
                    <Th>Order Details</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders?.map((order) => {
                    return (
                      <Tr key={order?._id}>
                        <Td>{moment(order.date).utc().format("DD-MM-YYYY")}</Td>
                        <Td>{order.paymentType}</Td>
                        <Td>{order.paymentStatus}</Td>
                        <Td>
                          <Box as="a" href={`/order/${order?._id}`}>
                            {order._id}
                          </Box>
                        </Td>
                        <Td>₹ {order.total}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box display={"flex"} alignItems={"center"} py={4}>
              No Pending Orders
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PendingOrders;
