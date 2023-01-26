import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { roundTo } from "round-to";
import { CartState } from "../../../Context/CartProvider";
import SingleOrderItem from "./SingleOrderItem";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cart, shippingInfo, user, setOrderPlaced } = CartState();
  const total = cart?.cartItems?.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const placeOrder = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    await axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/order/makeOrder",
        shippingInfo,
        config
      )
      .then((res) => {
        toast({
          title: "Order Placed Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        axios.post(
          "https://meal-monkey-backend.onrender.com/api/sendmail",
          {
            email: user.email,
            subject: "Order Confirmation",
            html: `<h3>Hey ${user.name}, </h3>
            Thank you for shopping with us. Your order has been placed successfully.
            <br>
            <h3>Order Details</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Product Total</th>
            </tr>
            ${cart.cartItems
              .map(
                (item) =>
                  `<tr>
              <td>${cart.cartItems.indexOf(item) + 1}</td>
              <td>${item.product.name}</td>
              <td>₹ ${item.product.price}</td>
              <td>${item.qty}</td>
              <td>₹ ${item.product.price * item.qty}</td>
              </tr>`
              )
              .join("")}
            </table>
            <br>
            <h3>Shipping Details</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>Address</th>
            <th>Phone No</th>
            <th>Payment Type</th>
            <th>Total Amount Payable (After Taxes)</th>
            </tr>
            <tr>
            <td>${shippingInfo.address}</td>
            <td>${shippingInfo.phoneNo}</td>
            <td>${shippingInfo.paymentType}</td>
            <td>₹ ${roundTo(total + 0.18 * total, 0)}</td>
            </tr>
            </table>
            <br>
            <h3>Order Placed On</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>${new Date().toLocaleString()}</th>
            </tr>
            </table>
            <h3>Regards,</h3>
            <h3>Team Meal Monkey</h3>
            `,
          },
          config
        );
        setOrderPlaced(true);
        navigate("/orders");
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  const handleOrder = async () => {
    // console.log("Order Placed");
    setLoading(true);
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
        "https://meal-monkey-backend.onrender.com/api/user/isEmailVerified",
        {
          email: user?.email,
        },
        configuration
      )
      .then((res) => {
        if (
          !shippingInfo.address ||
          !shippingInfo.paymentType ||
          !shippingInfo.phoneNo
        ) {
          toast({
            title: "Please Enter all the fields",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        } else {
          placeOrder();
        }
      })
      .catch((err) => {
        toast({
          title: "Please Verify Your Email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      });
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      backgroundColor={"gray.50"}
      width={{ base: "100%", md: "36%" }}
    >
      <Box p={6}>
        {
          <Text p={4} fontSize={"xl"} fontWeight={"bold"}>
            Order Summary:
          </Text>
        }

        {cart.cartItems?.map((item) => (
          <SingleOrderItem key={item._id} item={item} />
        ))}
        {<Divider orientation="horizontal" borderColor={"gray.400"} />}
        {
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              minWidth={"full"}
              padding={4}
            >
              <Box fontSize={"xl"}>Total Amount </Box>
              <Box fontSize={"xl"}>
                {user ? `₹ ${roundTo(total, 2)}` : <></>}
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              minWidth={"full"}
              padding={4}
            >
              <Box fontSize={"xl"}>GST (18%) </Box>
              <Box fontSize={"xl"}>₹ {roundTo(total * 0.18, 2)}</Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              minWidth={"full"}
              padding={4}
            >
              <Box fontWeight={"medium"} fontSize={"xl"}>
                Total Amount after Taxes{" "}
              </Box>
              <Box fontWeight={"medium"} fontSize={"xl"}>
                ₹ {roundTo(total + 0.18 * total, 0)}
              </Box>
            </Box>
          </Box>
        }
        {
          <Box p={2}>
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              width={"full"}
              onClick={handleOrder}
              isLoading={loading}
            >
              Place Order
            </Button>
          </Box>
        }
      </Box>
    </Box>
  );
};

export default OrderSummary;
