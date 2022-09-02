import { Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DrawerButton = ({ icon, title, onClick }) => {
  return (
    <Button
      display={"flex"}
      bg={"white"}
      width="100%"
      justifyContent={"flex-start"}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} />
      <Box p={2}>{title}</Box>
    </Button>
  );
};

export default DrawerButton;
