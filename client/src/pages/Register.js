import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Register = () => {
  const Navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
              Register
            </Typography>

            <TextField
              placeholder="name"
              name="name"
              value={inputs.name}
              onChange={handelChange}
              margin="normal"
              type={"text"}
              required
            />
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
              style={{ borderradius: 10 }}
              sx={{ borderradius: 3, marginTop: 3 }}
            >
              Submit
            </Button>
            <Button
              type="submit"
              onClick={() => Navigate("/login")}
              color="primary"
              sx={{ dius: 3, marginTop: 3 }}
            >
              Already Register ? Please Login
            </Button>
          </Box>
        </form>
      </>
    </>
  );
};

export default Register;
