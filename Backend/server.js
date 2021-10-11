const express = require("express");
// const path= require('path');
// const cors = require('cors')

// const sandbox = require('./initialise.js');
// const { Companies, Locations, Menus, Meals } = require("./models.js");
// const { checkUser } = require('./auth');

const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

/////////////////////////////////////////////////////////

app.listen(2053, () => {console.log(`Server running on port: ${3000}`)});



app.get('/hello', async(req, res) => { // Get all companies
  res.json({report: 'All Working?'})
})