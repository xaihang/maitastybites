import { useState } from "react";
import { useDispatch } from "react-redux";
import "./UserPage.css";
import RecipeModal from "./RecipeForm";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RecipeItem({ recipe, handleEditRecipe }) {
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteRecipe = (recipeID) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipeID });
  };

  const handleEditClick = () => {
    if (recipe && recipe.recipeID) {
      handleEditRecipe(recipe.recipeID);
    }
  };


  return (
    <>
      <TableRow>
        <TableCell>{recipe?.recipename}</TableCell>
        <TableCell>{recipe?.description}</TableCell>
        <TableCell>
          <p
            onClick={handleEditClick}
            className={isHoveredEdit ? "edit-hovered" : ""}
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
          >
            Edit&nbsp; 
            <EditIcon sx={{ fontSize: 18 }}/>
          </p>
        </TableCell>
        <TableCell>
          <p
            onClick={() => handleDeleteRecipe(recipe?.recipeID)}
            className={isHoveredDelete ? "delete-hovered" : ""}
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
          >
            Delete&nbsp; 
            <DeleteIcon sx={{ fontSize: 18}}/>
          </p>
        </TableCell>
      </TableRow>
    </>
  );
}
