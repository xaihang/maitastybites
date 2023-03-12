import { useState } from "react";
import "./UserPage.css";
import CustomButton from "./CustomButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RecipeItem({ handleOpenModal }) {
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>Bacons with Eggs</TableCell>
        <TableCell>Very nice!</TableCell>
        <TableCell>
          <p
            onClick={() => console.log("je")}
            className={isHoveredEdit ? "edit-hovered" : ""}
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
          >
            Edit
          </p>
        </TableCell>
        <TableCell>
          <p
            onClick={() => console.log("sss")}
            className={isHoveredDelete ? "delete-hovered" : ""}
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
          >
            Delete
          </p>
        </TableCell>
      </TableRow>
    </>
  );
}
