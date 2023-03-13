import RecipeItem from "./RecipeItem";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./UserPage.css";
import { styled } from "@mui/material/styles";

const MUICustomTableContainer = styled("div")({
  maxWidth: "90%",
  margin: "auto",
});

export default function RecipeList({ handleOpenModal }) {
  const {recipesUser} = useSelector((store) => store.recipe);
  console.log('recipes111', recipesUser)

  if(recipesUser?.length === 0){
    return <p>Nothing to show...yet! Recipes you create will live here.
    </p>
  }

  return (
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
          {
            recipesUser?.map((recipe) => (
              <RecipeItem
                key={recipe?.recipeID}
                recipe={recipe}
                handleOpenModal={handleOpenModal}
              />
            ))
            }
        </TableBody>
      </Table>
    </MUICustomTableContainer>
  );
}
