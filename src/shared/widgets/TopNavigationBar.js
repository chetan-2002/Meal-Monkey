import React from "react";
import { Box } from "@chakra-ui/react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
const TopNavigationBar = ({ categories }) => {
  const headings = [];
  for (let i = 0; i < categories.length; i++) {
    headings.push(categories[i].name);
  }
  return (
    <Box
      m={2}
      overflowX={"auto"}
      overflowY={"hidden"}
      css={{
        scrollbarWidth: "none",
        "::-webkit-scrollbar": { display: "none" },
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Tabs variant="soft-rounded" isFitted>
        <TabList
          width={"max-content"}
          tabIndex={0}
          display={"flex"}
          alignItems={"center"}
        >
          {headings.map((heading, index) => (
            <a href={`#${heading}`} key={index}>
              <Tab key={index}>{heading}</Tab>
            </a>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default TopNavigationBar;
