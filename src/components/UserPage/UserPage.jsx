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

  const handleAddRecipeClick = () => {
    history.push("/add");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
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

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import RecipeList from "./RecipeList";
// import CustomButton from "./CustomButton";
// import RecipeForm from "./RecipeForm";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import "./UserPage.css";

// function UserPage() {
//   const dispatch = useDispatch();
// const recipes = useSelector((store) => store.recipes);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentRecipe, setCurrentRecipe] = useState(null); // hold the current recipe that needs to be edited
//   const user = useSelector((store) => store.user); // this component doesn't do much to start, just renders some user reducer info to the DOM

//   useEffect(() => {
//     dispatch({ type: "GET_USER_RECIPES" });
//   }, [dispatch]);

//   const handleOpenModal = (recipe) => {
//     setCurrentRecipe(recipe);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleFormClose = () => {
//     console.log('handleformclose clicked')
//     // Perform any cleanup or state updates needed when the form is closed
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, {user.username}!</h2>
//       {/* <p>Your ID is: {user.id}</p> */}
//       <div className="button-group">
//         <CustomButton variant="text" className="createdViewBtn">
//           Created
//         </CustomButton>
//         <CustomButton variant="text" className="savedViewBtn">
//           Saved
//         </CustomButton>
//         <div>
//           <CustomButton
//             variant="contained"
//             className="addRecipeBtn"
//             onClick={handleOpenModal}
//           >
//             Add Recipe
//           </CustomButton>
//         </div>
//       </div>

//       <RecipeList />

//       <RecipeForm onSave={handleFormClose} currentRecipe={selectedRecipe} />
//     </div>
//   );
// }

// // this allows us to use <App /> in index.js
// export default UserPage;
