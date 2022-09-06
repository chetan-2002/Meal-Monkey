import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideDrawerLeftList from "./SideDrawerList";
import { useNavigate } from "react-router-dom";
import {
  faAsterisk,
  faClockRotateLeft,
  faComment,
  faHouse,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const SideDrawerLeft = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const listItems = [
    {
      title: "Track Current  Order",
      icon: faLocationDot,
    },
    {
      title: "Order History",
      icon: faClockRotateLeft,
      onClick: () => {
        onClose();
        navigate("/orders");
      },
    },
    {
      title: "Home",
      icon: faHouse,
      onClick: () => {
        onClose();
        navigate("/");
      },
    },
    {
      title: "Terms and Conditions",
      icon: faAsterisk,
      onClick: () => {
        onClose();
        navigate("/tnc");
      },
    },
    {
      title: "Feedback",
      icon: faComment,
      onClick: () => {
        onClose();
        navigate("/feedback");
      },
    },
  ];
  return (
    <>
      <Button
        rightIcon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        color="white"
        bg={"blue.600"}
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.600" }}
        size={{ base: "sm", md: "md" }}
      ></Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <SideDrawerLeftList listItems={listItems} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawerLeft;
