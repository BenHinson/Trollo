const express = require("express");
const cors = require('cors');

const sequelize = require('./initialise.js');
const { Project, Board, Column, Task, User, ProjectMembers } = require("./models.js");
const auth = require('./auth.js');
const { nextTick } = require("process");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ 'origin': '*' }))

// Moved to startApp to facilitate testing
// app.listen(2053, () => { console.log(`Server running on port: ${2053}`) });

/////////////////////////////////////////////////////////

app.get('/user', auth.middle, async (req, res) => {
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
  } catch (error) {
    return res.status(400).json({ error })
  }
})


app.get('/projects', auth.middle, async (req, res) => { // Receives UID and returns names of projects and their id.
  let memberOfProjects = await ProjectMembers.findAll({ where: { userId: req.uID } });
  memberOfProjects = memberOfProjects.map(e => e.dataValues.projectId);

  Project.findAll({ where: { id: memberOfProjects } }).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({ 'message': 'failed', 'error': err }))
})

app.get('/project/:projectId', auth.middle, checkUserIsMember, async (req, res) => { // Receives projectId. Returns Boards within.
  const { projectId } = req.params;

  try {
    let data = { 'members': [], 'boards': [] };

    let members = (await ProjectMembers.findAll({ where: { projectId: projectId } })).map(e => e.dataValues.userId);
    data.members = (await User.findAll({ where: { id: members } })).map(e => {
      return {
        id: e.dataValues.id,
        email: e.dataValues.email,
        username: e.dataValues.username,
        avatar: e.dataValues.avatar
      }
    });


    data.boards = (await Board.findAll({ where: { projectId: projectId } })).map(e => e.dataValues);

    return res.json({ 'message': 'success', data })

  } catch (error) {
    return res.status(400).json({ 'message': 'failed', error })
  }
})

app.get('/project/:projectId/board/:boardId', auth.middle, checkUserIsMember, async(req, res) => { // Receives boardId. Returns columns. and their tasks.
  const {projectId, boardId} = req.params;

  let returnData = {
    board: {},
    columns: {}
  };

  returnData.board = (await Board.findByPk(boardId))?.dataValues;
  if (!returnData.board) { return res.status(400).json({'error': `No such board with id: ${boardId}`}) }

  let columnIds = [];
  (await Column.findAll({ where: { boardId: boardId } })).forEach(board => {
    returnData.columns[board.dataValues.id] = { ...board.dataValues, ...{ tasks: [] } }
    columnIds.push(board.dataValues.id);
  });

  (await Task.findAll({ where: { columnId: columnIds } })).forEach(task => {
    returnData.columns[task.dataValues.columnId].tasks.push(task);
  });

  return res.json({
    'message': 'success',
    'data': returnData
  });
})



app.post('/project', auth.middle, async (req, res) => { // Create Project. Takes: {name}
  const uid = req.uID;
  const { name } = req.body;

  if (!name) { return res.status(400).json({ 'error': 'Please provide a name for the project' }) }

  try {
    const createProject = await Project.create({ name, adminId: uid });
    let creator = await User.findByPk(uid);
    await createProject.addUser(creator);

    return res.json({
      'message': 'success',
      'data': { name },
      'id': createProject.dataValues.id,
    });
  } catch (error) {
    res.json({ 'message': 'failed', error })
  }
})

app.post('/project/:projectId/board', auth.middle, checkUserIsMember, async(req, res) => { // Create Board for the assigned projectID.
  const {projectId} = req.params;
  const {name} = req.body;
  if (!name) { return res.status(400).json({'error': 'Please provide a name for the board'}) };

  const background = ['#fafaeb', '#f3e4f1', '#d5ebda', '#f4cacd', '#ead3d4'][Math.round(Math.random() * 4)];


  try {
    let project = await Project.findByPk(projectId);
    let board = await project.createBoard({ name, background });

    // Create the initial base columns.
    await board.createColumn({ name: 'Ideas' });
    await board.createColumn({ name: 'Todo' });
    await board.createColumn({ name: 'Done' });

    res.json({
      'message': 'success',
      'data': { name },
      'id': board.dataValues.id,
    });
  } catch (error) {
    return res.json({ 'error': 'Failed to create new board' })
  }
})

app.post('/project/:projectId/board/:boardId/column', auth.middle, checkUserIsMember, async(req, res) => { // Create Column from a name
  const {projectId, boardId} = req.params;
  const {name} = req.body;

  try {
    let board = await Board.findByPk(boardId);
    let newColumn = await board.createColumn({ name });
    res.json({
      'message': 'success',
      'data': { name },
      'id': newColumn.dataValues.id,
    })
  } catch (error) {
    return res.json({ 'error': 'Failed to create new column' })
  }
})

app.post('/project/:projectId/board/:boardId/column/:columnId/task', auth.middle, checkUserIsMember, async(req, res) => { // Create Task
  const {projectId, boardId, columnId} = req.params;
  const {name, description, assigned} = req.body;

  try {
    let column = await Column.findByPk(columnId);
    let newTask = await column.createTask({ name, description, assigned, creatorId: req.uID });

    res.json({
      'message': 'success',
      'data': { name, description, assigned },
      'id': newTask.dataValues.id,
    })
  } catch (error) {
    return res.json({ 'error': 'Failed to create new task' })
  }

})

app.post('/user/signup', async (req, res) => { // Create User
  if (!req.body.email || !req.body.password) { return res.status(400).json({ 'error': 'Please provide an email and password' }) }
  await auth.createAccount({ email, password, avatar } = req.body, req, res);

})

app.post('/user/login', async (req, res) => {
  await auth.login({ email, password } = req.body, req, res);
})

app.post('/project/:projectId/member', auth.middle, checkUserIsMember, async(req, res) => {
  const{projectId} = req.params;
  const {email} = req.body;
  try {
    let newUser = (await User.findOne({where: {email}}))?.dataValues?.id;
    if (!newUser) { return res.status(400).json({'error': 'No Such User with that Email exists'}) }
    if ((await ProjectMembers.findOne({where: {projectId, userId: req.uID}}))?.dataValues) {
      return res.status(400).json({'error': 'The user is already a member of the project'})
    }

    await ProjectMembers.create({userId: newUser, projectId});
    res.json({
      'message': 'success',
    });

  } catch(error) {
    return res.status(400).json({'error': 'Failed to add a new member'})
  }
})




app.delete('/project/:projectId/board/:boardId', auth.middle, checkUserIsAdmin, async(req, res) => { // Delete a specific board. Only if admin
  const {projectId, boardId} = req.params;
  Board.destroy({where: {id: boardId}}).then((e) => {
    return res.json({
      'message': 'success'
    })
  }).catch((err) => res.json({'error': 'Failed to delete board'}));
})
app.delete('/project/:projectId/board/:boardId/column/:columnId', auth.middle, checkUserIsMember, async(req, res) => { // Delete a specific column
  const {projectId, boardId, columnId} = req.params;
  Column.destroy({where: {id: columnId}}).then((e) => {
    return res.json({
      'message': 'success'
    })
  }).catch((err) => res.json({'error': 'Failed to delete column'}));
})



app.patch('/project/:projectId/board/:boardId/column/:columnId', auth.middle, checkUserIsMember, async(req, res) => { // Edit the name of a column
  const {projectId, boardId, columnId} = req.params;
  const {name} = req.body;

  Column.update({name}, {where: {id: columnId}}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name}
    })
  }).catch((err) => res.json({'error': 'Failed to delete column'}))
})


app.use((req, res) => { return res.json({ 'Status': 'The API is working' }) })


/////////////////////////////////////////////////////////


async function checkUserIsMember(req, res, next) {
  return (await ProjectMembers.findOne({where: { projectId: req.params.projectId, userId: req.uID }}))?.dataValues
    ? next()
    : res.status(400).json({'error': 'You are not a member of this project'})
}
async function checkUserIsAdmin(req, res, next) {
  return (await Project.findOne({where: { id: req.params.projectId, adminId: req.uID }}))?.dataValues
    ? next()
    : res.status(400).json({'error': 'You are not the admin of this project'})
}


// Thoughts on making a couple small changes to the API endpoints to make them easier to understand? Here are my suggestions:
// Current API to make POST a task:  /project/1/1/1/task       (Add a task to project 1, board 1, column 1)
// 1) - /project/1/board/1/column/1/task  (Adding intermediate names)
// 2) - /task?project=1&board=1&column=1  (Moving the ids to the query parameter)

module.exports = app