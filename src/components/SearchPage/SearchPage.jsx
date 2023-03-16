import { useSelector } from 'react-redux';
import { useState } from "react";
import RecipeListGallery from '../LandingPage/RecipeListGallery';
import "../../components/LandingPage/LandingPage.css";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { recipesAll } = useSelector((state) => state.recipe);
  
    const filteredRecipes = recipesAll.filter((recipe) =>
    recipe.recipename.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
    return (
      <div>
        <RecipeListGallery recipes={filteredRecipes} />
      </div>
    );
  }