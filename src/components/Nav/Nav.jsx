import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import avatarImage from "../Nav/user.png";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./Nav.css";

const settings = ["Dashboard", "Log Out"];

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleNavTitleClick = () => {
    history.replace("/home");
  };

  const handleDashBoardClick = () => {
    history.replace("/user");
    handleCloseUserMenu();
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="navTitle"
            variant="h6"
            noWrap
            component={Link}
            to="/home"
            onClick={handleNavTitleClick}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <h2 className="navtitle">Mai-Tasty-Bites</h2>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* search input box here */}
            <Box className="searchBox">
              <SearchIcon className="searchIcon" />
              <InputBase
                placeholder="search recipes"
                className="searchInput"
                sx={{
                  "&:focus": {
                    outline: "none",
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.primary.main} inset`,
                  },
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                  borderRadius: "25px",
                  padding: "10px 15px",
                  width: "300px",
                  height: "40px",
                }}
              />
            </Box>

            <Link to={`/home`} className="navlink">
              {"Home"}
            </Link>

            {/* User is not login, show login/register link  */}
            {!user.id && (
              <Link to={`/login`} className="navlink">
                {"Login/Register"}
              </Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user.id && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      className="avatar"
                      alt="User Avatar"
                      src={avatarImage}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) =>
                    setting === "Dashboard" ? (
                      <MenuItem key={setting} onClick={handleDashBoardClick}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleCloseUserMenu();
                          handleLogout();
                        }}
                      >
                        <Typography textAlign="center">Log Out</Typography>
                      </MenuItem>
                    )
                  )}
                </Menu>
              </>
            )}
            {!user.id && <div to="/login">Login / Register</div>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
