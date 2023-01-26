import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { roundTo } from "round-to";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartState } from "../../../Context/CartProvider";
import SingleCartItem from "./SingleCartItem";
import { useNavigate } from "react-router-dom";

const CartModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();
  const { user, cart } = CartState();
  const total = cart?.cartItems?.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  // const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (cart?.cartItems?.length > 0 && user) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user, cart]);
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"2xl"} fontWeight={"medium"}>
              Your cart:
            </Text>
          </ModalHeader>
          <ModalBody
            maxH={"300px"}
            overflowY={"scroll"}
            css={{
              scrollbarWidth: "none",
              "::-webkit-scrollbar": { display: "none" },
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Box
              overflowY={"auto"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {user && cart?.cartItems?.length ? (
                <>
                  {cart?.cartItems?.map((item, index) => (
                    <SingleCartItem key={index} item={item} />
                  ))}
                  {<Divider orientation="horizontal" color={"black"} />}
                  {
                    <>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        minWidth={"full"}
                        padding={4}
                      >
                        <Box fontSize={"xl"}>Total Amount </Box>
                        <Box fontSize={"xl"}>₹ {roundTo(total, 2)}</Box>
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
                        <Box fontWeight={"bold"} fontSize={"xl"}>
                          Total Amount after Taxes{" "}
                        </Box>
                        <Box fontWeight={"bold"} fontSize={"xl"}>
                          ₹ {roundTo(total + 0.18 * total, 0)}
                        </Box>
                      </Box>
                    </>
                  }
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCartPlus} size={"4x"} />
                  <Text fontSize={"medium"} p={4}>
                    No items in cart yet!
                  </Text>
                </>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Continue Shopping
            </Button>
            <Button
              colorScheme={"whatsapp"}
              variant="outline"
              disabled={disabled}
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
