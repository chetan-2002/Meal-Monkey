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
      .post("http://localhost:5000/api/token/verifyToken", { token }, config)
      .then((res) => {
        toast({
          title: "Email Verified",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
        setLoading(false);
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
          width={"100%"}
          height={"100%"}
          m={"10"}
          justifyContent={"center"}
          backgroundColor={"white"}
        >
          <Spinner />
          <p>Verifying Email</p>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ConfirmEmail;
