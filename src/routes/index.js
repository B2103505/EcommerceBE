const UserRouter = require('./UserRouter');
const PlantRouter = require('./PlantRouter');
const CategoryRouter = require('./CategoryRouter');
const DiscountRouter = require('./DiscountRouter');
const CartRouter = require('./CartRouter');
const AddressRouter = require('./AddressRouter');
const OrderRouter = require('./OrderRouter');
const GhnRouter = require('./GhnRouter');
const VnpayRouter = require('./VNPayRouter')
const ReviewRouter = require('./ReviewRouter')
const StatsRouter = require('./StatsRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/plant', PlantRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/discount/', DiscountRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/address', AddressRouter);
    app.use('/api/order', OrderRouter)
    app.use('/api/ghn', GhnRouter)
    app.use('/api/vnpay', VnpayRouter)
    app.use('/api/review', ReviewRouter)
    app.use('/api/stats', StatsRouter)
}

module.exports = routes