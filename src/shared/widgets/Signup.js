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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdmin = false;
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

  const sendverificationEmail = async (id, token, name, email) => {
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
        "https://meal-monkey-backend.onrender.com/api/sendmail",
        {
          email: email,
          subject: "Verify your email",
          html: `<h3>Hey, ${name}</h3>
      <p>Thanks for signing up with us. Please verify your email by clicking on the link below.</p>
      <a href="https://meal-monkey-kappa.vercel.app/verify/${id}/${token}">
      https://meal-monkey-kappa.vercel.app/verify/${id}/${token}
      </a>
      <p>If you did not sign up with us, please ignore this email.</p>
      <p>Thanks</p>
      <p>Team Meal Monkey</p>`,
        },
        configuration
      )
      .then((res) => {
        toast({
          title: "Verification Email Sent",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error in sending verification email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
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
        "https://meal-monkey-backend.onrender.com/api/user/register",
        {
          name,
          email,
          password,
          phone,
          isAdmin,
        },
        config
      )
      .then((res) => {
        // console.log(res.data);
        toast({
          title: "User registered successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        getCartItems();
        setUser(res.data);
        sendverificationEmail(
          res.data._id,
          res.data.token,
          res.data.name,
          res.data.email
        );
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
        <FormControl mb={2}>
          <FormLabel>Phone No:</FormLabel>
          <Input
            type="number"
            variant={"flushed"}
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
