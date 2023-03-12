import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, TextField } from "@mui/material";
import "./UserPage.css";

function RecipeModal({ open, handleClose, currentRecipe }) {
  const dispatch = useDispatch();

  const initialFormValues = {
    recipeName: currentRecipe ? currentRecipe.name : "",
    description: currentRecipe ? currentRecipe.description : "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSave = (event) => {
    event.preventDefault();
    const recipeData = {
      title: formValues.recipeName,
      ingredients: formValues.ingredients,
      directions: formValues.instructions,
      url: formValues.imageUrl,
    };
    dispatch({ type: "ADD_RECIPE", payload: recipeData });
    handleClose();
    setFormValues(initialFormValues); // Clear input values
  };

  const handleCloseModal = () => {
    setFormValues(initialFormValues);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Modal open={open} onClose={handleCloseModal} className="modal-container">
      <div className="modal-container">
        <form onSubmit={handleSave}>
          <div className="modal-textfield">
            <TextField
              required
              placeholder="Recipe Name*"
              name="recipeName"
              className="recipe-name-textfield"
              value={formValues.recipeName}
              onChange={handleChange}
              type="text"
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              placeholder="Description*"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              placeholder="Ingredients*"
              name="ingredients"
              value={formValues.ingredients}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              placeholder="Instructions*"
              name="instructions"
              value={formValues.instructions}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              placeholder="Image URL"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
          </div>
          <div className="modal-buttons">
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default RecipeModal;
