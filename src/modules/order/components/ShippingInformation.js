import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { roundTo } from "round-to";
import { CartState } from "../../../Context/CartProvider";
// import { CartState } from "../../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
const ShippingInformation = () => {
  const { cart, user, setShippingInfo } = CartState();
  const navigate = useNavigate();
  const cartId = cart._id;
  const [City, setCity] = React.useState("");
  const toast = useToast();
  const [shippingInformation, setShippingInformation] = React.useState({
    userId: user._id,
    cart: cartId,
    address: "",
    paymentType: "COD",
    total: roundTo(cart?.total + 0.18 * cart?.total, 0),
    phoneNo: "",
  });
  const [loading, setLoading] = React.useState(false);
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation is not supported by your browser",
        description: "Please enter your address manually",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    let lat, lon;
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude.toFixed(7);
      lon = position.coords.longitude.toFixed(7);
      axios
        .get(
          `http://api.positionstack.com/v1/reverse?access_key=f2240e35c5b3530ce72d0da45273d907&query=${lat},${lon}`
        )
        .then((res) => {
          setShippingInformation({
            ...shippingInformation,
            address:
              res.data.data[0].name +
              ", " +
              res.data.data[0].neighbourhood +
              ", " +
              res.data.data[0].county +
              ", " +
              res.data.data[0].region,
          });
          setCity(res.data.data[0].region);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/menu");
    }
    setShippingInfo(shippingInformation);
    // eslint-disable-next-line
  }, [shippingInformation]);
  return (
    <Box width={{ base: "100%", md: "64%" }} p={6}>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        Shipping Information:
      </Text>
      <Box>
        <FormControl py={4} isReadOnly>
          <FormLabel py={2}>Full Name</FormLabel>
          <Input value={user?.name} placeholder="Enter your full Name"></Input>
        </FormControl>
        <FormControl py={6} isRequired>
          <FormLabel py={2}>Street Address</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter the Street Address"
              value={shippingInformation.address}
              onChange={(e) =>
                setShippingInformation({
                  ...shippingInformation,
                  address: e.target.value,
                })
              }
            ></Input>
            <IconButton
              isLoading={loading}
              ml={"2"}
              icon={<MdLocationOn />}
              onClick={getUserLocation}
              variant={"outline"}
            ></IconButton>
          </InputGroup>
        </FormControl>
        <Box display={"flex"} alignItems={"center"}>
          <FormControl
            py={4}
            isRequired
            width={{ base: "100%", md: "33%" }}
            pr={4}
          >
            <FormLabel py={2}>Zip Code</FormLabel>
            <Input type={"number"} placeholder="Enter Zip Code"></Input>
          </FormControl>
          <FormControl py={6} isRequired>
            <FormLabel py={2}>City</FormLabel>
            <Input
              placeholder="Enter City Name"
              value={City}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Input>
          </FormControl>
        </Box>
        <FormControl py={6} isReadOnly>
          <FormLabel py={2}>Email Address</FormLabel>
          <Input
            type={"email"}
            value={user?.email}
            placeholder="Enter Your Email Address"
          ></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel py={2}>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+91" />
            <Input
              type="tel"
              placeholder="Phone number"
              value={shippingInformation.phoneNo}
              onChange={(e) => {
                setShippingInformation({
                  ...shippingInformation,
                  phoneNo: e.target.value,
                });
              }}
            />
          </InputGroup>
        </FormControl>
      </Box>
      <Text fontSize={"xl"} fontWeight={"bold"} pt={12} pb={3}>
        Payment Information:
      </Text>
      <Box py={4}>
        <FormControl as="fieldset">
          <RadioGroup
            // defaultValue="COD"
            value={shippingInformation.paymentType}
            onChange={(e) => {
              setShippingInformation({
                ...shippingInformation,
                paymentType: e,
              });
            }}
          >
            <HStack
              spacing="24px"
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Radio value="COD">Cash on Delivery</Radio>
              <Radio value="Card">Credit/Debit Card</Radio>
              {/* <Radio value="UPI">UPI</Radio> */}
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ShippingInformation;
