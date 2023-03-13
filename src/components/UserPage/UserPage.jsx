import React, { useState } from "react";
import { useSelector } from "react-redux";
import RecipeList from "./RecipeList";
import CustomButton from "./CustomButton";
import RecipeModal from "./RecipeModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./UserPage.css";

function UserPage() {
  const dispatch = useDispatch();
const recipes = useSelector((store) => store.recipes);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null); // hold the current recipe that needs to be edited
  const user = useSelector((store) => store.user); // this component doesn't do much to start, just renders some user reducer info to the DOM

  useEffect(() => {
    dispatch({ type: "GET_RECIPES" });
  }, [dispatch]);

  const handleOpenModal = (recipe) => {
    setCurrentRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <div className="button-group">
        <CustomButton variant="text" className="createdViewBtn">
          Created
        </CustomButton>
        <CustomButton variant="text" className="savedViewBtn">
          Saved
        </CustomButton>
        <div>
          <CustomButton
            variant="contained"
            className="addRecipeBtn"
            onClick={handleOpenModal}
          >
            Add Recipe
          </CustomButton>
        </div>
      </div>

      <RecipeList />

      <RecipeModal open={modalOpen} handleClose={handleCloseModal} />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
