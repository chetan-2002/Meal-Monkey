import React from "react";
import { Box } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import SingleProduct from "./SingleProduct";
import Heading from "../../../shared/widgets/Heading";
const SingleSection = ({ category }) => {
  return (
    <Box width={{ base: "100%", md: "65%" }}>
      <Heading categoryName={category.name} />
      <Grid
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(4,1fr)" }}
        gap={8}
      >
        {category.products?.map((product, index) => (
          <SingleProduct key={index} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default SingleSection;
