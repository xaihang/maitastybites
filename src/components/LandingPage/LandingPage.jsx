import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import RecipeListGallery from "./RecipeListGallery";
import heroImage from '../LandingPage/hero.png';
import Button from "@mui/material/Button";

const FreeSignUpButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/registration');
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 20px",
        marginTop: "10px",
        transition: "all 0.3s ease",
        borderRadius: 25,
        "&:hover": {
          backgroundColor: "darkred",
        },
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
      onClick={handleClick}
    >
      Free Sign up!
    </Button>
  );
};

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
      <FreeSignUpButton />
      <RecipeListGallery />
    </div>
  );
}

export default LandingPage;
