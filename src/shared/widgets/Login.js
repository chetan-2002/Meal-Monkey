import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { CartState } from "../../Context/CartProvider";

const Login = ({ onLoginComplete }) => {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { setUser, setCart } = CartState();

  const getCartItems = async () => {
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
        "https://meal-monkey-backend.onrender.com/api/cart/getCartItems",
        {
          userId: JSON.parse(localStorage.getItem("userInfo"))._id,
        },
        configuration
      )
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    const config = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/user/login",
        { email, password },
        config
      )
      .then((res) => {
        // console.log(res.data);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        getCartItems();
        setUser(res.data);
        onLoginComplete();
      })
      .catch((err) => {
        toast({
          title: err.response.data.err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  const handleClick = () => setShow(!show);
  return (
    <Box
      width={"full"}
      color={"black"}
      display={"flex"}
      flexDir={"column"}
      mb={3}
    >
      {/* <Text fontSize={"md"} fontWeight={"medium"}>
        Login with valid mobile number:-
      </Text>
      <InputGroup>
        <InputLeftAddon children="+91" />
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
      <Button width={"100%"} colorScheme={"whatsapp"} mt={3}>
        Submit
      </Button>
      <Box textAlign={"center"} fontSize={"medium"} p={4}>
        OR
      </Box> */}
      <Box
        width={"full"}
        color={"black"}
        display={"flex"}
        flexDir={"column"}
        mb={3}
      >
        <Text fontSize={"medium"} fontWeight={"medium"} mb={2}>
          Login with Email and Password:-
        </Text>
        <FormControl mb={2} isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            variant={"flushed"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password:</FormLabel>
          <InputGroup variant={"flushed"} size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          width={"100%"}
          colorScheme={"whatsapp"}
          mt={3}
          onClick={loginHandler}
          isLoading={loading}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
