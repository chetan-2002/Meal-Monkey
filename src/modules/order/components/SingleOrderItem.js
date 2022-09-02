import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
// import { CartState } from "../../../Context/CartProvider";

const SingleOrderItem = ({ item }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Box mr={2}>
          <Image
            borderRadius={5}
            src={item.product.image}
            alt="image"
            width={"6rem"}
            height={"6rem"}
          ></Image>
        </Box>
        <Box p={2}>
          <Text fontSize={"xl"} fontWeight={""}>
            {item.product.name.length > 17
              ? item.product.name.slice(0, 15) + "..."
              : item.product.name}
          </Text>
          <Text fontSize={"lg"} fontWeight={""}>
            x {item.qty}{" "}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize={"xl"} fontWeight={""}>
          ₹ {item.product.price * item.qty}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleOrderItem;
