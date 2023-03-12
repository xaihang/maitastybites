import "./UserPage.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RecipeItem() {
  return (
    <>
      <TableRow>
        <TableCell>Bacons with Eggs</TableCell>
        <TableCell>Very nice!</TableCell>
        <TableCell>
          <button>Edit</button>
        </TableCell>
        <TableCell>
          <button>Delete</button>
        </TableCell>
      </TableRow>
    </>
  );
}
