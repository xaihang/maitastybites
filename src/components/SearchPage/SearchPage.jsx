import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import RecipeListGallery from "../LandingPage/RecipeListGallery";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { recipesAll } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchWord = queryParams.get("query");

  useEffect(() => {
    setSearchTerm(searchWord);
    dispatch({ type: "GET_ALL_RECIPES" });
  }, [dispatch, searchWord]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.searchInput.value);
  };

  const filteredRecipes = recipesAll.filter(recipe => {
    const searchTermLower = searchTerm.toLowerCase();
    const recipeNameLower = recipe.recipename.toLowerCase();
    const ingredientsLower = recipe.ingredients.toLowerCase();
    return recipeNameLower.includes(searchTermLower) || ingredientsLower.includes(searchTermLower);
  });

  return (
    <div>
      <div className="hero-search-container">
        <div className="hero-search-title">
          <h1>Search Results For "{searchTerm}"</h1>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="searchInput"
            className="search-box-search-input"
            placeholder="search recipe"
          />
          <button className="searchBtn" type="submit">Search</button>
        </form>
      </div>
      <div className="container-search-results">
        <RecipeListGallery recipesList={filteredRecipes} />
      </div>
    </div>
  );
}
