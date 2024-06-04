const express = require("express");
let router = express.Router();
let Controllers = require("../Controllers/userController"); // index.js

// http://localhost:8005/api/users

router.get('/', (req, res) => {
Controllers.userController.getUsers(res);
})

 // http://localhost:8005/api/users/create
router.post('/create', (req, res) => {
Controllers.userController.createUser(req.body, res);
})

// http://localhost:8005/api/users/<id> adds a PUT route to update
router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
    })

    router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res)
    })

module.exports = router