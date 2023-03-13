import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import RecipeListGallery from "./RecipeListGallery";
import heroImage from '../LandingPage/hero.png';

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ALL_RECIPES" });
  }, [dispatch]);

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <img src={heroImage} alt="hero image" />
      <RecipeListGallery />
    </div>
  );
}

export default LandingPage;
