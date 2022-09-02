import React from "react";
import { Badge, Box, Button, Text } from "@chakra-ui/react";
import SideDrawerLeft from "./SideDrawerLeft";
import SideDrawerRight from "./SideDrawerRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartModal from "../../modules/cart/components/CartModal";
import { CartState } from "../../Context/CartProvider";

const Navbar = () => {
  const { cart, user } = CartState();
  return (
    <Box
      bg={"blue.600"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
    >
      <Box display={"flex"} alignItems={"center"}>
        <SideDrawerLeft />
        <Text
          color="white"
          fontSize={{ base: "xl", md: "3xl" }}
          // pt={1}
          // pb={1}
          py={{ base: "3", md: "1" }}
          fontWeight={"bold"}
          fontFamily={"sans-serif"}
        >
          Meal Monkey
        </Text>
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CartModal>
          <Button
            bgColor={"blue.600"}
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.600" }}
          >
            <Box display={{ base: "none", md: "flex" }}>
              <Box>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  color="white"
                  size={"xl"}
                />
              </Box>
              <Box>
                {user ? (
                  <Badge borderRadius={"full"}>{cart?.totalItem}</Badge>
                ) : null}
              </Box>
            </Box>
          </Button>
        </CartModal>
        <SideDrawerRight />
      </Box>
    </Box>
  );
};

export default Navbar;
