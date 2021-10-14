const supertest = require('supertest');
const app = require('./server');
const models = require('./models');
const initDb = require('./initialise');
const { objectContaining } = require('expect');
const auth = require('./auth');

const request = supertest(app);

beforeEach(async () => {
    await initDb();
});

const testUser = {email:"test", password: "password"}
const testProject = {name: "Test Project"}
const testBoard = {name: "Test Board"}
const testColumn = {name: "Test Column"}
const testTask = {name: "Test Task"}

const createUserWithProject = async ({testUser,testProject}) => {
    const tu = await models.User.create(testUser)
    const tp = await models.Project.create(testProject)
    await tp.addUser(tu)
    return {tu, tp}
}

describe("tests GET routes", () => {
    test('GET /user with cookie returns authenticated users data', async () => {
        await models.User.create(testUser)
        const res = await request.get('/user').set('auth','trollo')
        expect(res.body.data).toEqual(expect.objectContaining({email: testUser.email}))
    })

    test('GET /projects returns users projects', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const res = await request.get('/projects').set('auth','trollo');
        expect(res.body.data[0]).toEqual(expect.objectContaining(testProject))
    })

    test('GET /projects/:projectid returns data for correct project', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const res = await request.get(`/project/${tp.dataValues.id}`).set('auth','trollo')
        expect(res.body.data.members[0]).toEqual(expect.objectContaining({email: testUser.email}))
    })

    test('GET /projects/:projectid/board/:boardid returns data for correct board', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const tb = await tp.createBoard(testBoard)
        const res = await request.get(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}`).set('auth','trollo')
        expect(res.body.data.board).toEqual(expect.objectContaining(testBoard))
    })
})

describe('tests POST routes', () => {
    test('POST /project creates a new project', async () => {
        const tu = await models.User.create(testUser)
        const res = await request.post('/project').set('auth','trollo').send(testProject)
        const q = await models.Project.findAll()
        expect(q[0]).toEqual(expect.objectContaining(testProject))
    });

    test('POST /project/:projectid/board creates a new board', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const res = await request.post(`/project/${tp.dataValues.id}/board`).set('auth','trollo').send(testBoard)
        const q = await models.Board.findAll()
        expect(q[0]).toEqual(expect.objectContaining(testBoard))
    })

    test('POST /project/:projectId/board/:boardId/column create a new column', async () => {
        const {tu, tp} = await createUserWithProject({testUser, testProject})
        const tb = await tp.createBoard(testBoard)
        const res = await request.post(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}/column`).set('auth','trollo').send(testColumn)
        const q = await models.Column.findAll()
        console.log(res.body)
        expect(q[0]).toEqual(objectContaining(testColumn))
    })

    test('POST /project/:projectId/board/:boardId/column/:columnId/task creates a new task', async () => {
        const {tu, tp} = await createUserWithProject({testUser, testProject})
        const tb = await tp.createBoard(testBoard)
        const tc = await tb.createColumn(testColumn)
        const res = await request.post(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}/column/${tc.dataValues.id}/task`).set('auth', 'trollo').send(testTask)
        const q = await models.Task.findAll()
        expect(q[0]).toEqual(objectContaining(testTask))

    })

    test('POST /user/signup creates a new user', async () => {
        const req = await request.post('/user/signup').send(testUser)
        const q = await models.User.findAll()
        expect(q[0].dataValues).toEqual(expect.objectContaining({email: testUser.email}))
    })

    test('POST /user/login returns user data', async () => {
        // Should not be using a request to create user in a test but currently the only way to do it.
        const tu = await request.post('/user/signup').send(testUser)
        const req = await request.post('/user/login').send(testUser);
        // console.log(req.body);
        expect(req.body.account).toEqual(expect.objectContaining({email: testUser.email}))
    })
})

describe('tests DELETE routes', () => {
    // Need to find out how admin is assigned for this test to work
    xtest('DELETE /project/:projectId/board/:boardId deletes a board', async () => {
        const {tu, tp} = await createUserWithProject({testUser, testProject})
        const tb = await tp.createBoard(testBoard)
        const res = await request.delete(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}`).set('auth', 'trollo')
        const q = await models.Board.findAll()

    })

    test('DELETE /project/:projectId/board/:boardId/column/:columnId deletes column', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const tb = await tp.createBoard(testBoard)
        const tc = await tb.createColumn(testColumn)
        const res = await request.delete(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}/column/${tc.dataValues.id}`).set('auth', 'trollo')
        const q = await models.Column.findAll()
        expect(q.length).toEqual(0);
    })
})

describe('tests PATCH routes', () => {
    test('PATCH /project/:projectId/board/:boardId/column/:columnId', async () => {
        const {tu, tp} = await createUserWithProject({testUser,testProject})
        const tb = await tp.createBoard(testBoard)
        const tc = await tb.createColumn(testColumn)
        const res = await request.patch(`/project/${tp.dataValues.id}/board/${tb.dataValues.id}/column/${tc.dataValues.id}`).set('auth','trollo')
        .send({name:'Patched Test Column'})
        const q = await models.Column.findAll();
        expect(q[0].dataValues.name).toBe("Patched Test Column")
    })
})

