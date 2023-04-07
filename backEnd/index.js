const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/Basic-Project");

const clientInfo = require("./Schema");

const app = express();
app.use(express.json());

app.post("/bookings", async (req, res) => {
  let data = new clientInfo(req.body);
  let result = await data.save();
  res.send(result);
  console.log(result);
});

app.get("/bookings", async (req, res) => {
  let data = await clientInfo.find();
  res.send(data);
});

app.delete("/bookings/:_id", async (req, res) => {
  let data = await clientInfo.deleteOne(req.params);
  res.send(data);
});

app.listen(4200);
