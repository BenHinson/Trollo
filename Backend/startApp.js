const app = require("./server");
const initDb = require('./initialise');
const models = require('./models')
const auth = require('./auth')

const seedData = async () => {
    const u1 = await auth.seedAccount({ email: "user1@mail.com", password: "password" })
    const u2 = await auth.seedAccount({ email: "user2@mail.com", password: "password" })
    const u3 = await auth.seedAccount({ email: "user2@mail.com", password: "password" })
    const p1 = await models.Project.create({ name: "Project One" })
    const p2 = await models.Project.create({ name: "Project Two" })

    await p1.addUser(u1)
    await p1.addUser(u3)
    await p2.addUser(u2)

    const todo = await p1.createBoard({ name: "TODO" })
    const appDev = await p2.createBoard({ name: "App Development" })

    const today = await todo.createColumn({ name: "Today" })
    await today.createTask({ name: "Go to shops", description: "To buy dinner" })
    await today.createTask({ name: "Reply to emails", description: "As soon as possible" })
    const tomorrow = await todo.createColumn({ name: "Tomorrow" })
    await tomorrow.createTask({ name: "Attend a meeting" })
    await tomorrow.createTask({ name: "Visit friends", description: "Dont forget to bring food" })
    const nextWeek = await todo.createColumn({ name: "Next Week" })
    await nextWeek.createTask({ name: "Clean house" })
    const frontend = await appDev.createColumn({ name: "Frontend" })
    await frontend.createTask({ name: "Finish styling", description: "Make sure it looks nice" })
    await frontend.createTask({ name: "Connect to API" })
    await frontend.createTask({ name: "Fix bug with animations", description: "Work out what stops them rendering" })
    const backend = await appDev.createColumn({ name: "Backend" })
    await backend.createTask({ name: "Add new API routes", description: "For patching / deleteing items." })
    const testing = await appDev.createColumn({ name: "Testing" })
    await testing.createTask({ name: "Add tests for new routes", description: "New routes have been added for deleteing" })
    await testing.createTask({ name: "Fid out why some tests are failing" })

    const demo = await auth.seedAccount({ email: "demo@trollo.com", password: "password" })
    const demoProject = await models.Project.create({ name: "Trollo" })
    await demoProject.addUser(demo);

    const theApp = await demoProject.createBoard({ name: "The Application" })
    const fe = await theApp.createColumn({ name: "Frontend" })
    await fe.createTask({ name: "Tidy up componenents", description: "Make sure all the lefotver console.logs are gone." })
    await fe.createTask({ name: "Style landing page" })
    const be = await theApp.createColumn({ name: "Backend" })
    await be.createTask({ name: "Make sure all tests are passing" })
    await be.createTask({ name: "Add documentation for all API routes" })
    const docs = await theApp.createColumn({ name: "Documentation" })
    docs.createTask({ name: "Make sure all routes of the API are documented" })
    docs.createTask({ name: "Add screenshots to application documentation" })

    const presentation = await demoProject.createBoard({ name: "The Presentation" })
    const todo2 = await presentation.createColumn({ name: "TODO" })
    todo2.createTask({ name: "Create demo user" })
    todo2.createTask({ name: "Run through presentation" })

}

(async () => {
    await initDb()
    await seedData()
    app.listen(2053, () => { console.log(`Server running on port: ${2053}`) });
})()