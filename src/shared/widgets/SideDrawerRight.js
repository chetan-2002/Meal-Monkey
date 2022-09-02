import React from "react";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  Avatar,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

import {
  faArrowRightFromBracket,
  faCartShopping,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { CartState } from "../../Context/CartProvider";
import DrawerButton from "./DrawerButton";
import CartModal from "../../modules/cart/components/CartModal";
import { useNavigate } from "react-router-dom";

const SideDrawerRight = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const { user, setUser } = CartState();
  const navigate = useNavigate();
  // console.log(user);
  const username = user ? user.name : "";

  const listItems = [
    {
      title: "Your Cart",
      icon: faCartShopping,
    },
    {
      title: "Your Orders",
      icon: faList,
    },
    {
      title: "Logout",
      icon: faArrowRightFromBracket,
    },
  ];

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        color="white"
        bg={"blue.600"}
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.600" }}
      >
        <Avatar name="" src="https://bit.ly/broken-link" size={"sm"} />
        <Box
          display={"flex"}
          ml={2}
          flexDir={"column"}
          alignItems={"flex-start"}
        >
          {username ? (
            <Text>Hi , {username.split(" ")[0]}</Text>
          ) : (
            <>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                MY ACCOUNT
              </Text>
              <Text fontSize={"xs"} fontWeight={"medium"} color={"blue.300"}>
                Login/Signup
              </Text>
            </>
          )}
        </Box>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {username ? (
            <>
              <Box p={3}>
                <CartModal>
                  <DrawerButton
                    icon={listItems[0].icon}
                    title={listItems[0].title}
                  ></DrawerButton>
                </CartModal>
                <DrawerButton
                  icon={listItems[1].icon}
                  title={listItems[1].title}
                  onClick={() => {
                    onClose();
                    navigate("/orders");
                  }}
                ></DrawerButton>
                <DrawerButton
                  icon={listItems[2].icon}
                  title={listItems[2].title}
                  onClick={() => {
                    onClose();
                    localStorage.removeItem("userInfo");
                    setUser(null);
                    onClose();
                    toast({
                      title: "Logged out successfully",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                ></DrawerButton>
              </Box>
            </>
          ) : (
            <DrawerBody>
              <Tabs isFitted mt={2} variant={"soft-rounded"}>
                <TabList
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Tab>Login</Tab>
                  <Tab>Signup</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Login
                      onLoginComplete={() => {
                        onClose();
                      }}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Signup
                      signupCompleted={() => {
                        onClose();
                      }}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawerRight;
