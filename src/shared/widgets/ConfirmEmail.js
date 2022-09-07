import { Box, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    axios
      .post(
        "https://meal-monkey-backend.herokuapp.com/api/token/verifyToken",
        { token },
        config
      )
      .then((res) => {
        toast({
          title: "Email Verified",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Error Verifying Email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <Box>
      {loading ? (
        <Box
          bgColor={"white"}
          py={5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner />
          <Box p={4}>Verifying Email...</Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ConfirmEmail;
