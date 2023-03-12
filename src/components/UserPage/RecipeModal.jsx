import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import "./UserPage.css";

const initialFormValues = {
  recipeName: "",
  description: "",
  ingredients: "",
  instructions: "",
  imageUrl: "",
};

function RecipeModal({ open, handleClose }) {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(formValues);
    handleClose();
  };

  const handleCloseModal = () => {
    setFormValues(initialFormValues);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="modal-container">
        <form onSubmit={handleSave}>
          <TextField
            required
            label="Recipe Name"
            name="recipeName"
            value={formValues.recipeName}
            onChange={handleChange}
          />
          <TextField
            required
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
          <TextField
            required
            label="Ingredients"
            name="ingredients"
            value={formValues.ingredients}
            onChange={handleChange}
          />
          <TextField
            required
            label="Instructions"
            name="instructions"
            value={formValues.instructions}
            onChange={handleChange}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
          />
          <div className="button-group">
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
