import {
  Box,
  IconButton,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CartState } from "../../../Context/CartProvider";

const SingleCartItem = ({ item }) => {
  const { setCart, user } = CartState();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const updateProduct = async (productId, operation) => {
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
        "https://meal-monkey-backend.onrender.com/api/cart/updateCartItems",
        { productId, operation, userId: user._id },
        config
      )
      .then((res) => {
        setCart(res.data);
        toast({
          title: `Cart updated successfully`,
          description:
            operation === "inc"
              ? `A ${item.product.name} was added`
              : `A ${item.product.name} is removed`,
          status: operation === "inc" ? "success" : "warning",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  return (
    <Box
      borderRadius={5}
      display={"flex"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={{ base: "2", md: "4" }}
    >
      <Image
        src={item?.product?.image}
        alt={item?.product?.name}
        width={{ base: "4rem", md: "6rem" }}
        height={{ base: "4rem", md: "6rem" }}
        borderRadius={"8px"}
        display={{ base: "none", md: "block" }}
      />
      <Box flexBasis={{ basis: "25%" }}>
        <Text
          padding={3}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight={{ base: "medium", md: "bold" }}
          width={{ base: "100%" }}
        >
          {item.product.name.length > 10
            ? item.product.name.substring(0, 7) + "..."
            : item.product.name}
        </Text>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <Box p={{ base: "1", md: 3 }} display={"flex"} alignItems={"center"}>
          <IconButton
            icon={<AiOutlinePlus />}
            borderRadius={"full"}
            onClick={() => updateProduct(item.product._id, "inc")}
          ></IconButton>
          <Text p={{ base: "2", md: "4" }} fontWeight={"bold"}>
            {item.qty}
          </Text>
          <IconButton
            icon={<AiOutlineMinus />}
            borderRadius={"full"}
            onClick={() => updateProduct(item.product._id, "dec")}
          ></IconButton>
        </Box>
      )}

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight={{ base: "medium", md: "bold" }}
          p={{ base: "1", md: "4" }}
        >
          ₹ {item.product.price * item.qty}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleCartItem;
