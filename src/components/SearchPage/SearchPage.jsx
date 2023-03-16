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
  console.log("searchWord", searchWord);
  console.log("recipesAll", recipesAll);

  useEffect(() => {
    setSearchTerm(searchWord);
    dispatch({ type: "GET_ALL_RECIPES" });
  }, [dispatch, searchWord]);

  console.log("searchTerm", searchTerm);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.searchInput.value);
  };

  const filteredRecipes = recipesAll?.filter(recipe => {
    return recipe.recipename.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log('filteredRecipes', filteredRecipes)

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
            placeholder="search recipe name"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container-search-results">
        <RecipeListGallery recipesList={filteredRecipes} />
      </div>
    </div>
  );
}
