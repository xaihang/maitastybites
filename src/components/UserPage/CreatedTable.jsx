import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";

export default function CreatedTable() {
  return (
    <TableContainer component={Paper}>
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
      </TableBody>
    </Table>
  </TableContainer>
  )
}
