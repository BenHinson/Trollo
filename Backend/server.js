const express = require("express");
const path= require('path');

const initialise = require('./initialise.js');
const { Project, Board, Column, Task, User } = require("./models.js");
const auth = require('./auth.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

/////////////////////////////////////////////////////////

app.get('/test', auth.middle, async(req, res) => {
  res.json({'auth': 'trusted'});
})

app.get('/:projectID', async(req, res) => {}) // Fetch Project -> Calls Users Assigned
app.get('/:projectID/:boardID', async(req, res) => {}) // Fetch Board -> Calls Column -> Calls Tasks


app.post('/project', async(req, res) => {}) // Create Project
app.post('/:projectID/board', async(req, res) => {}) // Create Board
app.post('/:projectID/:boardID/column', async(req, res) => {}) // Create Column
app.post('/:projectID/:boardID/:columnID/task', async(req, res) => {}) // Create Task


app.post('/user/signup', async(req, res) => { // Create User
  // We could use an error code here and have the frontend decide on the message / action appropriate?
  if (!req.body.email || !req.body.password) { return res.status(400).json({'error': 'Please provide an email and password'}) }
  await auth.createAccount({email, password, name, avatar, permissions} = req.body, req, res);
})

app.post('/user/login', async(req, res) => {
  await auth.login({email, password} = req.body, req, res);
})