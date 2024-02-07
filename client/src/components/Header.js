import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  // Global state
  const navigate = useNavigate();
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();

  // State
  const [value, setValue] = useState(0); // Initialize value to match the index of the default Tab

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logged out successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display="flex" marginLeft="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs"></Tab>
                <Tab label="My Blogs" component={Link} to="/my-blogs"></Tab>
                <Tab
                  label="Create Blog"
                  component={Link}
                  to="/create-blog"
                ></Tab>
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLogin ? (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
