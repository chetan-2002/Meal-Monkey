import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../Context/CartProvider";

const Feedback = () => {
  const [feedback, setFeedback] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = CartState();
  const navigate = useNavigate();
  const toast = useToast();
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    if (feedback.length === 0) {
      toast({
        title: "Please fill the feedback field.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        "service_2qegk6w",
        "template_ur6vnyi",
        e.target,
        "OYin7dlCVETAlXKvu"
      )
      .then(
        (result) => {
          toast({
            title: "Feedback sent successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
          navigate("/");
        },
        (error) => {
          toast({
            title: "Error sending feedback.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        }
      );
    e.target.reset();
  };

  return (
    <form onSubmit={sendEmail} method={"post"}>
      {user ? (
        <>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"gray.50"}
          >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Box fontSize={"4xl"} display={"flex"}>
                  <Text
                    textAlign={"center"}
                    fontSize={"4xl"}
                    fontWeight={"extrabold"}
                  >
                    Submit Your Feedback Here
                  </Text>
                </Box>
              </Stack>
              <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl id="Name">
                    <FormLabel color={"black"}>Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Category Name"
                      value={user?.name}
                      name="from_name"
                    />
                  </FormControl>
                  <FormControl colorScheme={"black"} id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Category Name"
                      value={user?.email}
                      name="email"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Feedback</FormLabel>
                    <Textarea
                      value={feedback}
                      onChange={(e) => {
                        setFeedback(e.target.value);
                      }}
                      name="message"
                    ></Textarea>
                  </FormControl>
                  <Stack spacing={12}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      isLoading={loading}
                    >
                      Submit Feedback
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </>
      ) : (
        <>
          <Box
            bgColor={"white"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"center"}
            mt={"5"}
          >
            Please Login to submit your feedback!!
          </Box>
        </>
      )}
    </form>
  );
};

export default Feedback;
