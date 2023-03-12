import { useSelector } from "react-redux";
import RecipeList from "./RecipeList";
import CustomButton from "./CustomButton";
import "./UserPage.css";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
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
          <CustomButton variant="contained" className="addRecipeBtn">
            Add Recipe
          </CustomButton>
        </div>
      </div>

    <RecipeList />

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
