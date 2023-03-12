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
  return (
    <>
      <TableRow>
        <TableCell>Bacons with Eggs</TableCell>
        {/* <TableCell>Very nice!</TableCell> */}
        <TableCell align="right">
          <CustomButton
            variant="text"
            className="editBtn"
            onClick={handleOpenModal}
          >
            Edit
          </CustomButton>
        </TableCell>
        <TableCell>
          <CustomButton variant="text" className="deleteBtn">
            Delete
          </CustomButton>
        </TableCell>
      </TableRow>
    </>
  );
}


// export default function RecipeItem({ recipe, handleOpenModal }) {
//   return (
//     <>
//       <TableRow>
//         <TableCell>{recipe.name}</TableCell>
//         <TableCell>{recipe.description}</TableCell>
//         <TableCell>
//           <CustomButton
//             variant="text"
//             className="editBtn"
//             onClick={handleOpenModal}
//           >
//             Edit
//           </CustomButton>
//         </TableCell>
//         <TableCell>
//           <CustomButton variant="text" className="deleteBtn">
//             Delete
//           </CustomButton>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// }
