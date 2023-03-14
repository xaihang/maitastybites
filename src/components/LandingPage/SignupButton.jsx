import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

const SignUpButton = () => {
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
          "&.sign-up-button": {
            marginTop: "-30px",
          },
        }}
        onClick={handleClick}
        className="sign-up-button"
      >
        Sign up
      </Button>
    );
  };
  
  export default SignUpButton; 