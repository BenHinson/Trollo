const app = require("./server");
const initDb = require('./initialise');

(async () => {
    await initDb()
    app.listen(2053, () => { console.log(`Server running on port: ${2053}`) });
})()