const Express = require('express');
const productController = require('../controllers/productController');

const router = Express.Router();

router.post('/', productController.postProducts);

module.exports = router;
