const express = require("express");
const { getAllBlogsController,
    createBlogController,
    updateBlogController,
    getblogByIdController,
    deleteBlogController, 
    userBlogController}
    = require("../controller/blogController");

//router object 
const router = express.Router();

//routes

//GET || all-blogs
router.get('/all-blog', getAllBlogsController);

//GET ||all blogs
router.post('/create-blog', createBlogController);

//PUT ||update blog
router.put('/update-blog/:id', updateBlogController);

//GET || single blog details
router.get('/get-blog/:id', getblogByIdController);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

 //GET || user Blog
router.get('/user-blog/:id', userBlogController);

module.exports = router