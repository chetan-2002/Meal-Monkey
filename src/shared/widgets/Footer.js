import React from "react";
import { Box } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Box
      textAlign={"center"}
      p={"10"}
      fontSize={"medium"}
      fontWeight={"medium"}
    >
      Made with ❤️ by{" "}
      <a
        href="https://portfolio-website-pied-nine.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        Meal Monkey Team
      </a>{" "}
      © 2022
    </Box>
  );
};

export default Footer;
