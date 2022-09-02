import React from "react";
import { Box, Text } from "@chakra-ui/react";
const Heading = ({ categoryName }) => {
  return (
    <Box id={categoryName}>
      <Box
        mt={{ base: "5", md: "10" }}
        mb={{ base: "5", md: "10" }}
        bgColor={"white"}
        width={"max-content"}
        pl={6}
        pr={6}
        pt={2}
        pb={2}
        borderRadius={32}
      >
        <Text fontSize={"md"} fontWeight={"medium"} fontFamily={"heading"}>
          {categoryName}
        </Text>
      </Box>
    </Box>
  );
};

export default Heading;
