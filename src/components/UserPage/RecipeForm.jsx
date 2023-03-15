import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Modal, Button, TextField } from "@mui/material";
import "./UserPage.css";

function RecipeForm({ open, handleClose, currentRecipe }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const initialFormValues = {
    recipename: "",
    description: "",
    ingredients: "",
    direction: "",
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    // Update formValues state with current recipe info when currentRecipe prop changes
    if (currentRecipe) {
      setFormValues({
        recipename: currentRecipe.recipename || "",
        description: currentRecipe.description || "",
        ingredients: currentRecipe.ingredients || "",
        direction: currentRecipe.direction || "",
        imageUrl: currentRecipe.url || "",
      });
    } else {
      setFormValues(initialFormValues);
    }
  }, [currentRecipe]);

  const handleSave = (event) => {
    event.preventDefault();
    const recipeData = {
      recipename: formValues.recipename,
      description: formValues.description,
      ingredients: formValues.ingredients,
      direction: formValues.direction,
      url: formValues.imageUrl,
      userId: user.id,
    };

    if (currentRecipe) {
      // If currentRecipe exists, update recipe with the same recipeID
      recipeData.recipeID = currentRecipe.recipeID;
      dispatch({ type: "UPDATE_RECIPE", payload: recipeData });
    } else {
      dispatch({ type: "ADD_RECIPE", payload: recipeData });
    }
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
              label="Recipe Name"
              name="recipename"
              className="recipe-name-textfield"
              value={formValues.recipename}
              onChange={handleChange}
              type="text"
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              label="Ingredients"
              name="ingredients"
              value={formValues.ingredients}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
              required
              label="Direction"
              name="direction"
              value={formValues.direction}
              onChange={handleChange}
              sx={{ width: "90%", mb: 1.5 }}
            />
            <TextField
            label="Image URL"
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

export default RecipeForm;
