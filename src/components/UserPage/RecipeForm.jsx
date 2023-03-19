import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./UserPage.css";
import { useParams } from 'react-router-dom';

function RecipeForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const { id } = useParams();

  const recipe = useSelector((state) => state.recipe.selectedRecipe);

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
  }, [dispatch, id]);

  useEffect(() => {
    if (recipe && id) {
      setFormValues({
        recipename: recipe.recipename || "",
        description: recipe.description || "",
        ingredients: recipe.ingredients || "",
        direction: recipe.direction || "",
        imageUrl: recipe.url || "",
      });
    }
  }, [recipe]);

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

    if (id) {
      recipeData.recipeID = id;
      dispatch({ type: "UPDATE_RECIPE", payload: recipeData });
    } else {
      dispatch({ type: "ADD_RECIPE", payload: recipeData });
    }

    history.push("/user");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCancel = () => {
    history.push("/user");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSave}>
        <div className="modal-textfield">
          <TextField
            required
            label="Recipe Name"
            name="recipename"
            className="recipe-name-textfield"
            value={formValues?.recipename}
            onChange={handleChange}
            type="text"
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            required
            label="Description"
            name="description"
            value={formValues?.description}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            required
            label="Ingredients"
            name="ingredients"
            value={formValues?.ingredients}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            required
            label="Direction"
            name="direction"
            value={formValues?.direction}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formValues?.imageUrl}
            onChange={handleChange}
            sx={{ width: "90%", mb: 1.5 }}
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
