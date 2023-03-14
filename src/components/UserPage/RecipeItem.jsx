import { useState } from "react";
import "./UserPage.css";
import RecipeModal from "./RecipeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RecipeItem({ recipe, handleOpenModal }) {
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  return (
    <>
     <TableRow>
      <TableCell>{recipe?.recipename}</TableCell>
      <TableCell>{recipe?.description}</TableCell>
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
            onClick={() => console.log("sss")}
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
          currentRecipe={recipe}
          handleSave={(editedRecipe) => console.log(editedRecipe)}
        />
      )}
    </>
  );
}
