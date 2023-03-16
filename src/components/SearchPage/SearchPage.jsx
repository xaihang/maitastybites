import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import RecipeListGallery from '../LandingPage/RecipeListGallery';
import { useParams } from "react-router-dom";
import "./SearchPage.css";


export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    // const { recipesAll } = useSelector((state) => state.recipe);
    const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.recipe);
  
  useEffect(() => {
    if (searchTerm) {
        dispatch({ type: "SEARCH_RECIPE" });
    }
  }, [dispatch, searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.searchInput.value);
  };

  return (
    <div>
      <div className="hero-search-container">
        <div className="hero-search-title">
        <h1>Search Results For "{searchTerm}"</h1>
        </div>
        <form onSubmit={handleSearch}>
          <input type="text" name="searchInput" className="search-box-search-input" placeholder="Search" />
          <button type="submit">search recipe name</button>
        </form>
      </div>
      <div className="container-search-results">
      <RecipeListGallery recipes={searchResult} />
      </div>
    </div>
  );
}