import React, { useEffect } from "react";
import Navbar from "../../../shared/widgets/Navbar";
import TopNavigationBar from "../../../shared/widgets/TopNavigationBar";
import { Box } from "@chakra-ui/react";
import SingleSection from "../components/SingleSection";
import Footer from "../../../shared/widgets/Footer";
import axios from "axios";
import Lottie from "lottie-web";
import animate from "lottie-web";

const Products = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const container = React.useRef(null);
  const getAllCategoriesWithProducts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get("https://meal-monkey-backend.onrender.com/api/category/", config)
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../shared/styles/loading.json"),
    });
    animate.setSpeed(0.5);

    getAllCategoriesWithProducts();
  }, [setCategories]);
  return (
    <>
      {loading ? (
        <Box
          mt={{ base: "40vh", md: "15vh" }}
          bgColor={"white"}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={"30%"}
            height={"30%"}
            className="container"
            ref={container}
          ></Box>
        </Box>
      ) : (
        <>
          <Navbar />
          <TopNavigationBar categories={categories} />
          <Box
            ml={{ base: "6", md: "12" }}
            mt={12}
            mr={{ base: "6", md: "12" }}
          >
            {categories.map((category, index) => (
              <SingleSection key={index} category={category} />
            ))}
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};

export default Products;
