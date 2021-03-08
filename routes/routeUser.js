const Express = require('express');

const router = Express.Router();
const userController = require('../controllers/userController');
// might not be able to find
// DOUBLE ..
// const User = require('../services/models/user');

router.post('/', userController.postUser);
router.get('/', userController.getUser);
router.get('/:postId', userController.getUserID);
router.delete('/:postId', userController.deleteUser);
router.patch('/:postId', userController.patchUser);

module.exports = router;
