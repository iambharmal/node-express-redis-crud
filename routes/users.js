const express = require('express')
const userController = require('./../controllers/user.controller')

const router = express.Router();

router.get('/user/:id', userController.index) // get
router.patch('/user', userController.update) // update
router.post('/user', userController.add) // add
router.delete('/user/:id', userController.deleteUser) // delete

module.exports = router