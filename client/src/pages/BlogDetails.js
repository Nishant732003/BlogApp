import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";

const BlogDetails = () => {
  const [inputs, setInputs] = useState({});

  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  //get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(blog);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"40%"}
          border={3}
          style={{ dius: 10 }}
          padding={3}
          margin="auto"
          boxshadow="10px 10px 20px #ccc"
          display="flex"
          flexDirection={"column"}
        >
          <Typography
            variant="h2"
            text-align={"center"}
            fontWeight={"bold"}
            padding={3}
            color="45CFDD"
            marginTop={"30px"}
          >
            Update A Post
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          ></TextField>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          ></TextField>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          ></TextField>
          <Button
            type="submit"
            color="warning"
            variant="contained"
            style={{ borderradius: 10 }}
          >
            UPDATE
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
