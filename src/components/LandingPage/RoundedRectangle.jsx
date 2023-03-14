import React from "react";
import SignUpButton from "./SignupButton";
import "./LandingPage.css";

const RoundedRectangle = () => {
  return (
    <div className="rounded-rectangle">
      <p>
        Join our community of food lovers and share your delicious creations with
        the world!
      </p>
      <SignUpButton />
    </div>
  );
};

export default RoundedRectangle;
