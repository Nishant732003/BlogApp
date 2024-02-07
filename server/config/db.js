
const colors = require("colors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}blogapp`);
    console.log(
      `Connected to mongodb database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Mongo connect error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
