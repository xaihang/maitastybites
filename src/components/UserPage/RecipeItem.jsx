import { useState } from "react";
import { useDispatch } from "react-redux";
import "./UserPage.css";
import RecipeModal from "./RecipeForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RecipeItem({ recipe }) {
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const dispatch = useDispatch();

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleSaveRecipe = (updatedRecipe) => {
    setCurrentRecipe(updatedRecipe);
    setEditModalOpen(false);
  };

  const handleDeleteRecipe = (recipeID) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipeID });
  };

  return (
    <>
      <TableRow>
        <TableCell>{currentRecipe?.recipename}</TableCell>
        <TableCell>{currentRecipe?.description}</TableCell>
        <TableCell>
          <p
            onClick={handleOpenEditModal}
            className={isHoveredEdit ? "edit-hovered" : ""}
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
          >
            Edit
          </p>
        </TableCell>
        <TableCell>
          <p
            onClick={() => handleDeleteRecipe(currentRecipe?.recipeID)}
            className={isHoveredDelete ? "delete-hovered" : ""}
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
          >
            Delete
          </p>
        </TableCell>
      </TableRow>
      {editModalOpen && (
        <RecipeModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          currentRecipe={currentRecipe}
          handleSave={handleSaveRecipe}
        />
      )}
    </>
  );
}
