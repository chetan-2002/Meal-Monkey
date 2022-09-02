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
import axios from "axios";
import React from "react";
import { useState } from "react";
import { CartState } from "../../Context/CartProvider";

const Signup = ({ signupCompleted }) => {
  const [show, setShow] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdmin = false;
  const toast = useToast();
  const { setUser, setCart } = CartState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
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
        "http://localhost:5000/api/user/register",
        {
          name,
          email,
          password,
          isAdmin,
        },
        config
      )
      .then((res) => {
        toast({
          title: "User registered successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
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
            "http://localhost:5000/api/cart/getCartItems",
            {},
            configuration
          )
          .then((res) => {
            setCart(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setUser(res.data);
        signupCompleted();
      })
      .catch((err) => {
        toast({
          title: err.response.data.err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        signupCompleted();
      });
  };
  const handleClick = () => setShow(!show);
  return (
    <Box width={"full"} color={"black"} display={"flex"} flexDir={"column"}>
      <Box width={"full"} color={"black"} display={"flex"} flexDir={"column"}>
        <Text fontSize={"xl"} fontWeight={"bold"} mb={3}>
          Signup :
        </Text>
        <FormControl mb={2} isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            value={name}
            type="name"
            variant={"flushed"}
            placeholder="Enter Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={2} isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            variant={"flushed"}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={2} isRequired>
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
        <FormControl isRequired>
          <FormLabel>Confirm Password:</FormLabel>
          <InputGroup variant={"flushed"} size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleSubmit}
          isLoading={loading}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
