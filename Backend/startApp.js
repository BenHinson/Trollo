const app = require("./server");
const initDb = require('./initialise');
const models = require('./models')
const auth = require('./auth')

const seedData = async () => {
    const u1 = await auth.seedAccount({ email: "user1@mail.com", password: "password" })
    const u2 = await auth.seedAccount({ email: "user2@mail.com", password: "password" })
    const p1 = await models.Project.create({ name: "Project One" })
    const p2 = await models.Project.create({ name: "Project Two" })

    await p1.addUser(u1)
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


}

(async () => {
    await initDb()
    await seedData()
    app.listen(2053, () => { console.log(`Server running on port: ${2053}`) });
})()