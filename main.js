const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose")

//Environment Variables Configuration
require("dotenv").config();

const app = express();
app.use(express.json())

//Setting port 5000 when PORT is not given in ENV
const port = process.env.PORT || 5000;

//Static files
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res) {
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("public", options));

//Middleware For uploading files
app.use(fileUpload());
//Middleware For CORS
app.use(cors());

//Routes
app.use("/api/user", require("./server/routes/user"));
app.use("/api/vacancie", require("./server/routes/vacancie"));
app.use("/api/response", require("./server/routes/response"));

//Server starting function
async function start() {
  await mongoose
    .connect(process.env.MONGO__URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));

  app.listen(port, () => {
    console.log("server is running ...");
  });
}

//Starting Server
start();
