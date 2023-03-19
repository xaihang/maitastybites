import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import userProfile from "../../assets/images/generalavatar.png";
import CustomButton from "./CustomButton";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function UserHeader({ view }) {
  const { username } = useSelector((store) => store.user);
  const history = useHistory();

  const handleViewChange = () => {
    history.push(`/${view === "created" ? "saved" : "user"}`);
  };

  return (
    <>
      <h2>Hello, {username}!</h2>
      <div className="userProfileImgContainer">
        <img src={userProfile} alt="user-profile" className="userProfileImg" />
        <div className="cameraIconContainer">
          <CameraAltIcon className="cameraIcon" />
        </div>
      </div>
      <div className="button-group">
        <CustomButton
          variant="text"
          className={`${
            view === "created" ? "active createdViewBtn" : "createdViewBtn"
          }`}
          onClick={handleViewChange}
        >
          Created
        </CustomButton>
        <CustomButton
          variant="text"
          className={`${
            view === "saved" ? "active savedViewBtn" : "savedViewBtn"
          }`}
          onClick={handleViewChange}
        >
          Saved
        </CustomButton>
      </div>
    </>
  );
}
