import React, { useEffect, useState } from "react";
import { Box, Image, Text, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { CartState } from "../../../Context/CartProvider";

// import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { HStack } from "@chakra-ui/react";

const SingleProduct = ({ product }) => {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user, setCart } = CartState();
  useEffect(() => {
    if (user) {
      setButtonIsDisabled(false);
    }
    if (!user) {
      setButtonIsDisabled(true);
    }
  }, [user]);

  const toast = useToast();
  const handleAddTocart = async () => {
    setLoading(true);
    const productId = product._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    const body = {
      productId,
      userId: user._id,
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/cart/addToCart",
        body,
        config
      )
      .then((res) => {
        toast({
          title: `${product.name} added to cart successfully`,
          // description: "We've added the product to your cart",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCart(res.data);
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
  const price = `₹${product.price} `;
  return (
    <Box borderRadius={8} width={{ base: "full", md: "17rem" }} bgColor="white">
      <Image
        width={"100%"}
        height={"10rem"}
        src={product.image}
        borderRadius={"8px 8px 0 0"}
      />
      <Box
        display={"flex"}
        flexDir={"column"}
        height={"auto"}
        justifyContent={"space-between"}
        p={4}
      >
        <Box>
          <Text color={"black"} fontSize={"xl"}>
            {product.name}
          </Text>
          <Text color={"gray.600"}>
            {product.description.length > 50
              ? product.description.slice(0, 50) + "..."
              : product.description}
          </Text>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Text
                color={"blackAlpha.800"}
                fontSize={"lg"}
                pt={3}
                fontWeight={"medium"}
                textAlign={"left"}
              >
                Price
              </Text>
            </Box>
            <Box>
              <Text
                color={"blackAlpha.800"}
                fontSize={"medium"}
                pt={3}
                pr={2}
                fontWeight={"medium"}
                textAlign={"right"}
              >
                {price}
              </Text>
            </Box>
          </Box>
        </Box>
        {/* <HStack align={"stretch"} mt={"4"} spacing={"14"}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Size
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Crust
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
            </MenuList>
          </Menu>
        </HStack> */}

        <Box width={"full"}>
          <Button
            width={"100%"}
            variant={"outline"}
            colorScheme={"green"}
            mt={4}
            onClick={handleAddTocart}
            disabled={buttonIsDisabled}
            isLoading={loading}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleProduct;
