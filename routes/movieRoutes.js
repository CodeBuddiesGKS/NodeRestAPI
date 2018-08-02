const express = require('express');

const router = function() {
    const movieRoutes = express.Router();
    const movieController = require('../controllers/movieController')();

    movieRoutes.route('/')
    .get(movieController.get)
    .post(movieController.post);

    movieRoutes.route('/:id')
    .get(movieController.getById)
    .put(movieController.putById)
    .patch(movieController.patchById)
    .delete(movieController.deleteById);

    return movieRoutes;
}

module.exports = router;
