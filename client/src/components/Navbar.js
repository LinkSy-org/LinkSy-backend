import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import "../index.css";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

 return (
  <Stack
    className="navbar-gradient"
    mb={2}
    px={2}
    py={1.5}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      backgroundColor: "#C599B6",
      color: "white",
      fontWeight:"bold",
      borderRadius: 2,
      boxShadow: 2,
      flexWrap: "wrap",
    }}
  >
    {/* Left: Logo and App Name */}
    <HorizontalStack onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
      <RiContrast2Line size={33} color="#fff" />
      <Typography
        sx={{
          display: mobile ? "none" : "block",
          fontWeight: 600,
          marginLeft: 1,
        }}
        variant={navbarWidth ? "h6" : "h5"}
      >
        LinkSy
      </Typography>
    </HorizontalStack>

    {/* Center: Search Box */}
    {!mobile && !navbarWidth && (
      <Box component="form" onSubmit={handleSubmit} mx={2}>
        <TextField
          size="small"
          label="Search posts"
          variant="outlined"
          onChange={handleChange}
          value={search}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            input: { padding: "8px 12px" },
            width: 250,
          }}
        />
      </Box>
    )}

    {/* Right: Icons and Actions */}
    <HorizontalStack spacing={1}>
      {mobile && (
        <IconButton onClick={handleSearchIcon} sx={{ color: "#fff" }}>
          <AiOutlineSearch />
        </IconButton>
      )}
      <IconButton component={Link} to={"/"} sx={{ color: "#fff" }}>
        <AiFillHome />
      </IconButton>

      {user ? (
        <>
          <IconButton component={Link} to={"/messenger"} sx={{ color: "#fff" }}>
            <AiFillMessage />
          </IconButton>
          <IconButton
            component={Link}
            to={"/users/" + username}
            sx={{ padding: 0 }}
          >
            <UserAvatar width={30} height={30} username={user.username} />
          </IconButton>
          <Button onClick={handleLogout} sx={{ color: "#fff" }}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff" }}
            href="/signup"
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff" }}
            href="/login"
          >
            Login
          </Button>
        </>
      )}
    </HorizontalStack>

    {/* Mobile search input */}
    {navbarWidth && searchIcon && (
      <Box component="form" onSubmit={handleSubmit} mt={1} width="100%">
        <TextField
          size="small"
          label="Search posts"
          fullWidth
          onChange={handleChange}
          value={search}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Box>
    )}
  </Stack>
);

};

export default Navbar;
