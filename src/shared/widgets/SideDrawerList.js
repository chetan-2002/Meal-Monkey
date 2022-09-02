import React from "react";
import { Box, List, ListItem } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideDrawerLeftList = ({ listItems }) => {
  return (
    <List spacing={2} mt={2} ml={0}>
      {listItems.map((item) => (
        <Button
          display={"flex"}
          bg={"white"}
          width="100%"
          justifyContent={"flex-start"}
          onClick={item.onClick}
        >
          <ListItem
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            <FontAwesomeIcon icon={item.icon} size={"lg"} />
            <Box p={2}>{item.title}</Box>
          </ListItem>
        </Button>
      ))}
    </List>
  );
};

export default SideDrawerLeftList;
