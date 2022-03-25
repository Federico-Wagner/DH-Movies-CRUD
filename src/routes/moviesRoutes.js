const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);

router.get('/movies/add', moviesController.create);
router.post('/movies/add', moviesController.createPOST);

router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id', moviesController.editPUT);

router.delete('/movies/delete/:id', moviesController.deletePUT);

module.exports = router;