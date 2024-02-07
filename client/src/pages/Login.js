import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-hot-toast";

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handel change Input
  const handelChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow={"10px 10px 20px #6527BE"}
          padding={3}
          style={{ borderradius: 10 }}
        >
          <Typography
            variant="h4"
            padding={2}
            textAlign={"center"}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>

          <TextField
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handelChange}
            margin="normal"
            type="mail"
            required
          />
          <TextField
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handelChange}
            margin="normal"
            type="password"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            borderradius={5}
            sx={{ borderradius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            type="submit"
            onClick={() => Navigate("/register")}
            color="primary"
            sx={{ borderradius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
