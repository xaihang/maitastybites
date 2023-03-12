import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./Nav.css";

const pages = ["Home", "Info"];
const settings = ["Dashboard", "Logout"];

// const NavLink = styled(Link)({
//   display: "inline-block",
//   color: "#f2f2f2",
//   textAlign: "center",
//   padding: "24px 10px",
//   textDecoration: "none",
//   fontSize: "15px",
//   color: "black",
//   border: "none",
//   cursor: "pointer",
//   outline: 0,
//   "&:hover": {
//     backgroundColor: "#F0F3F4",
//   },
// });

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((store) => store.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            variant="h6"
            noWrap
            component={Link}
            to="/home"
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
            {/* Add the search input box here */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f1f3f4",
                borderRadius: 4,
                paddingLeft: 2,
                paddingRight: 2,
                marginLeft: 70,
                marginRight: 1, // Add a margin of 10px to the right
                marginTop: 2,
                width: 300, // Make the width 300px
                height: 40, // Change the height to 40px
              }}
            >
              <SearchIcon sx={{ color: "gray" }} />
              <InputBase
                placeholder="search recipes"
                sx={{ marginLeft: 1, flex: 5 }}
              />
            </Box>
            {/* End of search input box */}
            {pages.map((page) => (
              <Link key={page} to={`/${page.toLowerCase()}`} className="navlink">
                {page}
              </Link>
            ))}
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {!user.id && (
              <div to="/login">
                Login / Register
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Menu
        id="nav-menu"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem
            key={page}
            onClick={handleCloseNavMenu}
            component={Link}
            to={`/${page.toLowerCase()}`}
          >
            {page}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}

export default Nav;
