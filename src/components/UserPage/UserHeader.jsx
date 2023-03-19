import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import CustomButton from "./CustomButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function UserHeader({ view }) {
  const { id, username, profileimage } = useSelector((store) => store.user);
  console.log("profileimage", profileimage);
  const history = useHistory();
  const [OGprofileImage, setOGProfileImage] = useState(profileimage);
  const [profileImage, setProfileImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleViewChange = () => {
    history.push(`/${view === "created" ? "saved" : "user"}`);
  };

  const handleProfileImageSubmit = () => {
    dispatch({
      type: "UPDATE_USER_PROFILE_IMAGE",
      payload: { id, profileImage },
    });
    setOGProfileImage(profileImage); // update OGprofileImage state
    setProfileImage("");
    handleModalClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h2>Hello, {username}!</h2>
      <div className="userProfileImgContainer">
        <img
          src={OGprofileImage}
          alt="user-profile"
          className="userProfileImg"
        />
        <div className="cameraIconContainer">
          <CameraAltIcon
            className="cameraIcon"
            onClick={() => setModalOpen(true)}
          />
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="image-modal">
          <h2 id="modal-title">Enter image URL</h2>
          <TextField
            id="modal-url-input"
            label="Image URL"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            fullWidth
          />
          <CustomButton variant="contained" onClick={handleProfileImageSubmit}>
            Submit
          </CustomButton>
        </div>
      </Modal>
    </>
  );
}
