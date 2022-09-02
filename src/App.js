import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./config/routes/AppRoutes";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import nativeOperations from "./shared/services/native";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
    navigate("/menu");
    //eslint-disable-next-line
  }, []);
  return (
    <Box bgColor={"gray.100"}>
      <AppRoutes />
    </Box>
  );
}

export default App;
