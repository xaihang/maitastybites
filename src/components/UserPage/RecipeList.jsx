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

export default function RecipeList({handleOpenModal}) {
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

        <RecipeItem handleOpenModal={handleOpenModal} />

        </TableBody>
      </Table>
    </TableContainer>
  );
}



// export default function RecipeList({handleOpenModal}) {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Recipe Name</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Edit</TableCell>
//             <TableCell>Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>

//         {recipes.map((recipe) => (
//             <RecipeItem
//               key={recipe.id}
//               recipe={recipe}
//               handleOpenModal={() => handleOpenModal(recipe)}
//             />
//           ))}

//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
