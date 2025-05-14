const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:eventName', userController.getUsersByEvent);
router.get('/user/new', userController.renderAddUserForm);
router.post('/user/new', userController.addNewUser);
router.post('/user/delete', userController.deleteUser);

module.exports = router;
