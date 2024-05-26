// main file for starting the server.
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db.js");
const tasks = require("./route.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", tasks);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Unable to start the server.");
  }
};

start();
