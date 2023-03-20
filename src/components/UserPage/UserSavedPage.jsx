import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./UserPage.css";
import RecipeListGallery from "../LandingPage/RecipeListGallery";
import UserHeader from "./UserHeader";

function UserSavedPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_USER_RECIPES" });
    dispatch({ type: "GET_SAVED_RECIPES", payload: user.id }); // Fetch saved recipes for current user
  }, [dispatch, user.id]);

  const { savedRecipes } = useSelector((store) => store.recipe); // Get saved recipes for current user

  return (
    <div className="dashboard-container">
      <UserHeader view={"saved"} />
      {savedRecipes.length === 0 ? (
        <p>Nothing to show...yet! Recipes you saved will live here.</p>
      ) : (
        <RecipeListGallery recipesList={savedRecipes} fromDashboard={true} />
      )}
    </div>
  );
}


export default UserSavedPage;
