const express = require('express');
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT
require('./Database/config')


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
  });
  
  app.use(express.json());
  app.use(express.urlencoded({extended: true}))

// set router here





// end router here

app.listen(port , () =>{
    console.log(`server started on port ${port}`)
})