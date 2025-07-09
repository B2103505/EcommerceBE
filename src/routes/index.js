const UserRouter = require('./UserRouter');
const PlantRouter = require('./PlantRouter');

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/plant', PlantRouter)
}

module.exports = routes