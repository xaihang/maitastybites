import RecipeItem from "./RecipeItem";
import { useSelector, useDispatch } from "react-redux";
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
  const { recipesUser } = useSelector((store) => store.recipe);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const handleOpenModal = (recipe) => {
    setCurrentRecipe(recipe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentRecipe(null);
    setOpenModal(false);
  };

  const handleEditRecipe = (recipe) => {
    dispatch({ type: "GET_RECIPE_BY_ID", payload: recipe.recipeID });
    handleOpenModal(recipe);
  };

  //* if logged in user have on recipe contribution this msg will display on dashboard
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
      <RecipeModal
        open={openModal}
        handleClose={handleCloseModal}
        currentRecipe={currentRecipe}
      />
    </>
  );
}
