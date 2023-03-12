import RecipeItem from "./RecipeItem";
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
import { styled } from '@mui/material/styles';

const MUICustomTableContainer = styled('div')({
  maxWidth: '90%',
  margin: 'auto',
});


export default function RecipeList({handleOpenModal}) {

  return (
    <MUICustomTableContainer  component={Paper}>
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

        <RecipeItem handleOpenModal={handleOpenModal} />

        </TableBody>
      </Table>
    </MUICustomTableContainer >
  );
}