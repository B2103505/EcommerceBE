const UserRouter = require('./UserRouter');
const PlantRouter = require('./PlantRouter');
const CategoryRouter = require('./CategoryRouter');
const DiscountRouter = require('./DiscountRouter');

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/plant', PlantRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/discount/', DiscountRouter)
}

module.exports = routes