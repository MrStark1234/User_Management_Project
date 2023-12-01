const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const port = process.env.PORT || 6000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to Atlas");
    return mongoose.connection.getClient();
  })
  .then((client) => {
    const db = client.db("UsersDB");
    const usercollection = db.collection("userscollection");

    app.post("/setUser", (req, res) => {
      usercollection
        .insertOne(req.body)
        .then((result) => res.status(200).json())
        .catch((err) => console.log(err.message));
    });

    app.get("/getUser", (req, res) => {
      const users = [];
      usercollection
        .find()
        .forEach((user) => users.push(user))
        .then(() => res.status(200).json(users))
        .catch((err) => console.log(err.message));
    });
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on Port: ${port}`);
    });
  })

  .catch((err) => {
    console.log(err.message);
  });
