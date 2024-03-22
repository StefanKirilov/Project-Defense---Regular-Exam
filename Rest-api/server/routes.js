const router = require('express').Router();

const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');

router.use('/users', userController);
router.use('/bookings', bookingController);

module.exports = router;