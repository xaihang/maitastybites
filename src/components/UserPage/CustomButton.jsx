import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./UserPage.css";

const CustomButton = styled(Button)(({ theme }) => ({
  "&.createdViewBtn": {
    color: "black",
    outline: "none",
    padding: "10px 20px",
    marginRight: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f3f4",
    },
  },
  "&.savedViewBtn": {
    color: "black",
    outline: "none",
    padding: "10px 20px",
    marginRight: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f3f4",
    },
  },
  "&.addRecipeBtn": {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginTop: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "darkred",
    },
  },
}));

export default CustomButton;
