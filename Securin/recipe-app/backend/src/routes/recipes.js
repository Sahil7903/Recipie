const express = require('express');
const router = express.Router();
const { getAllRecipes, searchRecipes } = require('../controllers/recipeController');

router.get('/', getAllRecipes);
router.get('/search', searchRecipes);

module.exports = router;