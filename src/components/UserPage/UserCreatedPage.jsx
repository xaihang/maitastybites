import React from "react";
import { useSelector } from "react-redux";
import RecipeList from "./RecipeList";
import CustomButton from "./CustomButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import UserHeader from "./UserHeader";

function UserCreatedPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_USER_RECIPES" });
    dispatch({ type: "GET_SAVED_RECIPES", payload: user.id }); // Fetch saved recipes for current user
  }, [dispatch, user.id]);

  const history = useHistory();

  const handleAddRecipeClick = () => {
    history.push("/add");
  };

  return (
    <div className="dashboard-container">
      <UserHeader view={"created"} />
      <div>
        <CustomButton
          variant="contained"
          className="addRecipeBtn"
          onClick={handleAddRecipeClick}
        >
          Add Recipe
        </CustomButton>
      </div>
      <RecipeList />
    </div>
  );
}

export default UserCreatedPage;
