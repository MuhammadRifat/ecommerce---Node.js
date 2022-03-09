const express = require('express');
const { getCategories, getCategoriesById } = require('../controllers/categories.controller');
const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId', getCategoriesById);
// router.post('/', addCategory);
// router.patch('/', updateCategory);
// router.delete('/', deleteCategory);

module.exports = router;