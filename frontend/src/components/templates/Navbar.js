import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const refresh_storage = () => {
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    localStorage.setItem("status", "");
    localStorage.setItem("user_type", "");
    alert("Logout Success!");
    window.location = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {localStorage.getItem("status") === "1" &&
          localStorage.getItem("user_type") === "vendor" ? (
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
          ) : null}
          {localStorage.getItem("status") === "1" &&
          localStorage.getItem("user_type") === "buyer" ? (
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
          ) : null}
          {localStorage.getItem("status") === "1" &&
          localStorage.getItem("user_type") === "vendor" ? (
            <Button color="inherit">Add Item</Button>
          ) : null}
          {localStorage.getItem("status") === "1" &&
          localStorage.getItem("user_type") === "vendor" ? (
            <Button color="inherit" onClick={() => navigate("/orders")}>
              Orders
            </Button>
          ) : null}
          {localStorage.getItem("status") === "" ? (
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          ) : null}
          {localStorage.getItem("status") === "" ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : null}{" "}
          {localStorage.getItem("user_type") === "vendor" &&
          localStorage.getItem("status") === "1" ? (
            <Button color="inherit"> Food Menu</Button>
          ) : null}
          {localStorage.getItem("user_type") === "vendor" &&
          localStorage.getItem("status") === "1" ? (
            <Button color="inherit"> Orders Issued</Button>
          ) : null}
          {localStorage.getItem("user_type") === "vendor" &&
          localStorage.getItem("status") === "1" ? (
            <Button color="inherit"> Statistics</Button>
          ) : null}
          {localStorage.getItem("user_type") === "buyer" &&
          localStorage.getItem("status") === "1" ? (
            <Button color="inherit">Hello 2</Button>
          ) : null}
          {localStorage.getItem("status") === "1" ? (
            <Button color="inherit" onClick={() => refresh_storage()}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
