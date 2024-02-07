import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import moment from "moment"

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";


export default function BlogCard({title,image,description, username,time,id,isUser}) {
  const navigate = useNavigate();
  const handleDelete =  async() => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted")
        //navigate nahin ho raha isliye forcrfully through window function kar rahe
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = () => {
     navigate(`/blog-details/${id}`)
}
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}>
            <ModeEditIcon color="info"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon  color="error"/>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {username} */}
          </Avatar>
        }
        title={username}
       // i can use time prop also
        subheader={moment().startOf('day').fromNow() }
      />
      <CardMedia component="img" height="194" image={image} alt="palanpur" />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          Title:{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description:{description}
        </Typography>
      </CardContent>
     
    </Card>
  );
}
