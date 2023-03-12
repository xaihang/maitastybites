import React from "react";
import { useSelector } from "react-redux";
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

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <CustomButton variant="text" className="createdViewBtn">
        Created
      </CustomButton>
      <CustomButton variant="text" className="savedViewBtn">
        Saved
      </CustomButton>
      <div>
        <CustomButton variant="contained" className="addRecipeBtn">
          Add Recipe
        </CustomButton>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
