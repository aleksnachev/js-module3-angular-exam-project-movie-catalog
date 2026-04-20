const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController } = require('../controllers');

// Get all movies
router.get('/', movieController.getMovies);

// Create a new movie
router.post('/', auth(), movieController.createMovie);

// Get a specific movie
router.get('/:movieId', movieController.getMovie);

// Edit a movie
router.put('/:movieId', auth(), movieController.editMovie);

// Delete a movie
router.delete('/:movieId', auth(), movieController.deleteMovie);

// Like a movie
router.post('/:movieId/like', auth(), movieController.likeMovie);

// Unlike a movie
router.delete('/:movieId/like', auth(), movieController.unlikeMovie);

module.exports = router;
