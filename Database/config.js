const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);

dotenv.config();
mongoose
  .connect("mongodb+srv://tanmay:aCntuMLy1TfUBiBd@cluster0.qrp7xzb.mongodb.net/?retryWrites=true&w=majority", {
   
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e);
  });