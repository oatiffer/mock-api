const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Posts routes

router.get('/', postController.index);

router.post('/', postController.store);

router.get('/:id', postController.show);

router.put('/:id', postController.update);

router.delete('/:id', postController.destroy);

module.exports = router;
