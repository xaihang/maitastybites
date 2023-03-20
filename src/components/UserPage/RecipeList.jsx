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
  const user = useSelector((store) => store.user);


  const handleEditRecipe = (recipeID) => {
    
    const data = { recipeID, id: user.id };
    dispatch({ type: "GET_RECIPE_BY_ID", payload: data });
    history.push(`/edit/${recipeID}`);
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Recipe Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Edit</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesUser?.map((recipe, i) => (
              <RecipeItem
                key={i}
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
