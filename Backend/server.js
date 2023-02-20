const express = require("express");
const busRoutes = require("./routes/buses");
const mongoose = require("mongoose");
require("dotenv").config();

//express app
const app = express();

//middleware
app.use(express.json()); 

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/buses", busRoutes);

//connect to db
mongoose.set('strictQuery', true);
// mongoose.connect(process.env.MONGO_URI,)
mongoose.connect(process.env.MONGO_URI,{tlsCAFile:`rds-ca-2019-root.pem`})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening to ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Not connected!");
    console.log("reason : ", error);
  });
