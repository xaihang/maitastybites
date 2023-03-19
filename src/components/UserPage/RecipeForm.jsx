import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./UserPage.css";
import { useParams } from 'react-router-dom';

function RecipeForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedRecipe } = useSelector((store) => store.recipe);
  const { user } = useSelector((store) => store);

  const [formValues, setFormValues] = useState({
    recipename: "",
    description: "",
    ingredients: "",
    direction: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (id) {
      const data = { recipeID: id, id: user.id };
      dispatch({ type: "GET_RECIPE_BY_ID", payload: data });
    }
  }, [dispatch, id, user.id]);

  useEffect(() => {
    if (selectedRecipe && id) {
      setFormValues({
        ...selectedRecipe,
        imageUrl: selectedRecipe.url || "",
      });
    }
  }, [selectedRecipe, id]);

  const handleSave = (event) => {
    event.preventDefault();
    const recipeData = { ...formValues, url: formValues.imageUrl, userId: user.id };

    if (id) {
      recipeData.recipeID = id;
      dispatch({ type: "UPDATE_RECIPE", payload: recipeData });
    } else {
      dispatch({ type: "ADD_RECIPE", payload: recipeData });
    }

    history.push(`/user`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCancel = () => {
    history.push(`/user`);
  };

  const history = useHistory();

  return (
    <div className="form-container">
      <form onSubmit={handleSave}>
        <div className="modal-textfield">
          <TextField
            required
            label="Recipe Name"
            name="recipename"
            placeholder="Give recipe a name/title."
            className="recipe-name-textfield"
            value={formValues?.recipename}
            onChange={handleChange}
            type="text"
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            required
            label="Description"
            placeholder="A brief description about recipe."
            name="description"
            value={formValues?.description}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            placeholder="Add recipe image url here (optional)."
            value={formValues?.imageUrl}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            required
            label="Ingredients"
            placeholder="Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). "
            name="ingredients"
            value={formValues?.ingredients}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
            multiline
            rows={10}
          />
          <TextField
            required
            label="Directions"
            placeholder="Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. "
            name="direction"
            value={formValues?.direction}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
            multiline
            rows={14}
          />
          
        </div>
        <div className="modal-buttons">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
