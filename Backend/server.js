const express = require("express");
const path= require('path');
const cors = require('cors');
const { Op } = require('sequelize');

const initialise = require('./initialise.js');
const { Project, Board, Column, Task, User, ProjectMembers } = require("./models.js");
const auth = require('./auth.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ 'origin': '*' }))

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

/////////////////////////////////////////////////////////

app.get('/test', auth.middle, async(req, res) => { res.json({'auth': 'trusted'}); })


app.get('/projects', async(req, res) => { // Receives UID and returns names of projects and their id.
  let uid = req.headers.uid;

  Project.findAll({where: { id: uid }}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/project/:projectId', async(req, res) => { // Receives projectId. Returns Boards within.
  const projectId = req.params.projectId;
  Board.findAll({where: {projectId: projectId}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/board/:boardID', async(req, res) => { // Receives boardId. Returns columns. and their tasks.
  const boardID = req.params.boardID;
  Column.findAll({where: {id: boardID}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})



app.post('/project', async(req, res) => { // Create Project
  const uid = req.headers.uid;
  const {name} = req.body;

  if (!name) { return res.status(400).json({'error': 'Please provide a name for the project'}) }

  Project.create({name, adminId: uid}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})})
})
app.post('/project/:projectId/board', auth.middle, async(req, res) => { // Create Board for the assigned projectID.
  const projectId = req.params.projectId;
  const {name} = req.body;
  if (!name) { return res.status(400).json({'error': 'Please provide a name for the board'}) };

  const background = ['#fafaeb', '#f3e4f1', '#d5ebda', '#f4cacd', '#ead3d4'][Math.round(Math.random() * 4)];

  if (!checkUserIsMember(projectId, req.uID)) {
    return res.status(400).json({'error': 'You are not a member of this project'})
  }

  Project.createBoard({name, background}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name, background},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})})
})



app.post('/user/signup', async(req, res) => { // Create User
  if (!req.body.email || !req.body.password) { return res.status(400).json({'error': 'Please provide an email and password'}) }
  await auth.createAccount({email, password, name, avatar, permissions} = req.body, req, res);
})

app.post('/user/login', async(req, res) => {
  await auth.login({email, password} = req.body, req, res);
})

app.use((req, res) => { return res.json({'Status': 'The API is working'}) })




function checkUserIsMember(projectId, userId) {
  return Project.findOne({where: {projectId: projectId, adminId: userId}}).length ? true : false;
}



// app.post('/:projectID/board', async(req, res) => {}) // Create Board
// app.post('/:projectID/:boardID/column', async(req, res) => {}) // Create Column
// app.post('/:projectID/:boardID/:columnID/task', async(req, res) => {}) // Create Task