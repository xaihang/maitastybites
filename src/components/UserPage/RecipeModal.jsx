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
    <Modal open={open} onClose={handleCloseModal} className="modal-container">
      <div className="modal-container">
        <form onSubmit={handleSave}>
          <TextField
            required
            placeholder="Recipe Name*"
            name="recipeName"
            value={formValues.recipeName}
            onChange={handleChange}
            sx={{ width: '90%', mb: 1.5 }}
          />
          <TextField
            required
            placeholder="Description*"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            sx={{ width: '90%', mb: 1.5 }}
          />
          <TextField
            required
            placeholder="Ingredients*"
            name="ingredients"
            value={formValues.ingredients}
            onChange={handleChange}
            sx={{ width: '90%', mb: 1.5 }}
          />
          <TextField
            required
            placeholder="Instructions*"
            name="instructions"
            value={formValues.instructions}
            onChange={handleChange}
            sx={{ width: '90%', mb: 1.5 }}
          />
          <TextField
             placeholder="Image URL"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
            sx={{ width: '90%', mb: 1.5 }}
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
