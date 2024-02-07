const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//env config

dotenv.config();
//root me hai to path nahin dena direct le lega

//router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//mongodb connection
connectDB();

//res object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

//PORT
const PORT=process.env.PORT|| 8001

//listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_NODE} mode Port no ${PORT}`.bgCyan.white);
});