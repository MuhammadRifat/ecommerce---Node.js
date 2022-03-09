const express = require('express');
const { getProducts, uploadProduct, updateProduct, deleteProduct, getProductById, getProductsByCategoryId } = require('../controllers/products.controller');
const router = express.Router();

router.get('/', getProducts);
router.get('/productId/:productId', getProductById);
router.get('/categoryId/:categoryId', getProductsByCategoryId);
router.post('/', uploadProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;