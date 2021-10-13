const express = require("express");
const cors = require('cors');

const sequelize = require('./initialise.js');
const { Project, Board, Column, Task, User, ProjectMembers } = require("./models.js");
const auth = require('./auth.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ 'origin': '*' }))

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

/////////////////////////////////////////////////////////

app.get('/user', auth.middle, async(req, res) => {
  console.log(req.uID)
  try {
    let userData = await User.findByPk(req.uID)
    res.json({
      'message': 'success',
      'data': {
        id: userData.dataValues.id,
        username: userData.dataValues.username,
        email: userData.dataValues.email,
        avatar: userData.dataValues.avatar,
      }
    })
  } catch(error) {
    return res.status(400).json({error})
  }
})


app.get('/projects', auth.middle, async(req, res) => { // Receives UID and returns names of projects and their id.
  let memberOfProjects = await ProjectMembers.findAll({where: { userId: req.uID }});
  memberOfProjects = memberOfProjects.map(e => e.dataValues.projectId);

  Project.findAll({where: { id: memberOfProjects }}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/project/:projectId', auth.middle, async(req, res) => { // Receives projectId. Returns Boards within.
  const {projectId} = req.params;

  if (!checkUserIsMember(projectId, req.uID)) {return res.status(400).json({'error': 'You are not a member of this project'})}

  try {
    let data = {'members': [], 'boards': []};
    
    let members = (await ProjectMembers.findAll({where: {projectId: projectId}})).map(e => e.dataValues.userId);
    data.members = (await User.findAll({where: {id: members}})).map(e => {return {
      id: e.dataValues.id,
      email: e.dataValues.email,
      username: e.dataValues.username,
      avatar: e.dataValues.avatar
    }});

    
    data.boards = (await Board.findAll({where: {projectId: projectId}})).map(e => e.dataValues);

    return res.json({'message': 'success', data})

  } catch(error) {
    return res.status(400).json({'message': 'failed', error})
  }




  // Board.findAll({where: {projectId: projectId}}).then((e) => {
  //   return res.json({
  //     'message': 'success',
  //     'data': e.map(e => e.dataValues)
  //   });
  // }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/project/:projectId/board/:boardId', auth.middle, async(req, res) => { // Receives boardId. Returns columns. and their tasks.
  const {projectId, boardId} = req.params;

  if (!checkUserIsMember(projectId, req.uID)) {return res.status(400).json({'error': 'You are not a member of this project'})}

  let returnData = {
    board: {},
    columns: {}
  };

  returnData.board = (await Board.findByPk(boardId)).dataValues;

  let columnIds = [];
  (await Column.findAll({where: {boardId: boardId}})).forEach(board => {
    returnData.columns[board.dataValues.id] = {...board.dataValues, ...{tasks: []}}
    columnIds.push(board.dataValues.id);
  });

  (await Task.findAll({where: {columnId: columnIds}})).forEach(task => {
    returnData.columns[task.dataValues.columnId].tasks.push(task);
  });

  return res.json({
    'message': 'success',
    'data': returnData
  });
})



app.post('/project', auth.middle, async(req, res) => { // Create Project. Takes: {name}
  const uid = req.uID;
  const {name} = req.body;

  if (!name) { return res.status(400).json({'error': 'Please provide a name for the project'}) }

  try {
    const createProject = await Project.create({name, adminId: uid});
    let creator = await User.findByPk(uid);
    await createProject.addUser(creator);
  
    return res.json({
      'message': 'success',
      'data': {name},
      'id': createProject.dataValues.id,
    });
  } catch(error) {
    res.json({'message': 'failed', error})
  }
})
app.post('/project/:projectId/board', auth.middle, async(req, res) => { // Create Board for the assigned projectID.
  const projectId = req.params.projectId;
  const {name} = req.body;
  if (!name) { return res.status(400).json({'error': 'Please provide a name for the board'}) };

  const background = ['#fafaeb', '#f3e4f1', '#d5ebda', '#f4cacd', '#ead3d4'][Math.round(Math.random() * 4)];

  if (!checkUserIsMember(projectId, req.uID)) {return res.status(400).json({'error': 'You are not a member of this project'})}

  try {
    let project = await Project.findByPk(projectId);
    let board = await project.createBoard({name, background});
  
    // Create the initial base columns.
    await board.createColumn({name: 'Ideas'});
    await board.createColumn({name: 'Todo'});
    await board.createColumn({name: 'Done'});

    res.json({
      'message': 'success',
      'data': {name},
      'id': board.dataValues.id,
    });
  } catch(error) {
    return res.json({'error': 'Failed to create new board'})
  }
})
app.post('/project/:projectId/:boardId/column', auth.middle, async(req, res) => { // Create Column from a name
  const {projectId, boardId} = req.params;
  const {name} = req.body;
  if (!checkUserIsMember(projectId, req.uID)) {return res.status(400).json({'error': 'You are not a member of this project'})}

  try {
    let board = await Board.findByPk(boardId);
    let newColumn = await board.createColumn({name});
    res.json({
      'message': 'success',
      'data': {name},
      'id': newColumn.dataValues.id,
    })
  } catch(error) {
    return res.json({'error': 'Failed to create new column'})
  }
})
app.post('/project/:projectId/:boardId/:columnId/task', auth.middle, async(req, res) => { // Create Task
  const {projectId, boardId, columnId} = req.params;
  const {name, description} = req.body;
  if (!checkUserIsMember(projectId, req.uID)) {return res.status(400).json({'error': 'You are not a member of this project'})}

  try {
    let column = await Column.findByPk(columnId);
    let newTask = await column.createTask({name, description, creatorId: req.uId});

    res.json({
      'message': 'success',
      'data': {name, description},
      'id': newTask.dataValues.id,
    })
  } catch(error) {
    return res.json({'error': 'Failed to create new task'})
  }

})



app.post('/user/signup', async(req, res) => { // Create User
  if (!req.body.email || !req.body.password) { return res.status(400).json({'error': 'Please provide an email and password'}) }
  await auth.createAccount({email, password, avatar} = req.body, req, res);
})
app.post('/user/login', async(req, res) => {
  await auth.login({email, password} = req.body, req, res);
})

app.use((req, res) => { return res.json({'Status': 'The API is working'}) })


/////////////////////////////////////////////////////////

async function checkUserIsMember(projectId, userId) {
  return await ProjectMembers.findOne({where: {projectId, userId}}).length ? true : false;
}