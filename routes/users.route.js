const express = require('express');
const { getUser, updateUser, handleLogin, handleSignup, getUserOrders } = require('../controllers/users.controller');
const checkUserAuth = require('../middlewares/checkAuth');
const router = express.Router();



router.get('/', checkUserAuth, getUser);
router.get('/orders', checkUserAuth, getUserOrders);
router.patch('/:userId', checkUserAuth, updateUser);
router.post('/login', handleLogin);
router.post('/signup', handleSignup);

module.exports = router;