const express = require('express');
const userController = require('../controllers/userController');
const userPostsController = require('../controllers/userPostsController');

const router = express.Router();

// Users routes

router.get('/', userController.index);

router.post('/', userController.store);

router.get('/:id', userController.show);

router.patch('/:id', userController.update);

router.delete('/:id', userController.destroy);

// User posts routes

router.get('/:id/posts', userPostsController.index);

module.exports = router;
