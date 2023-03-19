import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import RecipeListGallery from "./RecipeListGallery";
import heroImage from "../LandingPage/hero.png";
import SignUpButton from "./SignupButton";

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ALL_RECIPES" });
  }, [dispatch]);

  const onLogin = (event) => {
    history.push("/login");
  };

    const { recipesAll } = useSelector((state) => state.recipe);

  return (
    <>
        <div className="hero-image-landing-page">
        <img src={heroImage} alt="hero image" />
      </div>
    <div className="container">
  
      <div className="rounded-rectangle">
        <div className="rounded-rectangle-text">
          <p>Welcome to</p>
          <h1>Mai Tasty Bites!</h1>
          {/* <span>Let's get happy cooking together</span> */}
          {/* <div className="signup-button">
            <SignUpButton />
          </div> */}
        </div>
      </div>
      <RecipeListGallery recipesList={recipesAll}/>
    </div>
          </>
  );
}

export default LandingPage;
