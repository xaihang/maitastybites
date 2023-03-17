import React, { useState } from "react";
import { useSelector } from "react-redux";
import RecipeList from "./RecipeList";
import CustomButton from "./CustomButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";

function UserPage() {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.recipes);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_USER_RECIPES" });
  }, [dispatch]);

  const history = useHistory();
  const [activeView, setActiveView] = useState("created"); // Add state to keep track of active view


  const handleAddRecipeClick = () => {
    history.push("/add");
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      <div className="button-group">
      <CustomButton
          variant="text"
          className={activeView === "created" ? "active createdViewBtn" : "createdViewBtn"} // Use active class if activeView is "created"
          onClick={() => handleViewChange("created")}
        >
          Created
        </CustomButton>
        <CustomButton
          variant="text"
          className={activeView === "saved" ? "active savedViewBtn" : "savedViewBtn"} // Use active class if activeView is "saved"
          onClick={() => handleViewChange("saved")}
        >
          Saved
        </CustomButton>
        <div>
          <CustomButton
            variant="contained"
            className="addRecipeBtn"
            onClick={handleAddRecipeClick}
          >
            Add Recipe
          </CustomButton>
        </div>
      </div>

      <RecipeList />
    </div>
  );
}

export default UserPage;

