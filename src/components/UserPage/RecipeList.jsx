import RecipeItem from "./RecipeItem";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./UserPage.css";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const MUICustomTableContainer = styled("div")({
  maxWidth: "90%",
  margin: "auto",
});

export default function RecipeList() {
  const { recipesUser } = useSelector((store) => store.recipe);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleEditRecipe = (recipeID) => {
    console.log('recipeID', recipeID)
    dispatch({ type: "GET_RECIPE_BY_ID", payload: recipeID });
    history.push(`/add/${recipeID}`);
  };



  // if logged in user have on recipe contribution this msg will display on dashboard
  if (recipesUser?.length === 0) {
    return <p>Nothing to show...yet! Recipes you create will live here.</p>;
  }

  return (
    <>
      <MUICustomTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recipe Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesUser?.map((recipe) => (
              <RecipeItem
                key={recipe?.recipeID}
                recipe={recipe}
                handleEditRecipe={handleEditRecipe}
              />
            ))}
          </TableBody>
        </Table>
      </MUICustomTableContainer>
    </>
  );
}
