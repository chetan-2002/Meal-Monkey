import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./config/routes/AppRoutes";
import { Box } from "@chakra-ui/react";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  return (
    <Box bgColor={"gray.100"}>
      <AppRoutes />
    </Box>
  );
}

export default App;
