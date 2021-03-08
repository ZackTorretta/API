const Express = require('express');
const userController = require('../controllers/userController');

const router = Express.Router();

router.post('/', userController.postUser);
router.get('/', userController.getUser);
router.get('/:postId', userController.getUserID);
router.delete('/:postId', userController.deleteUser);
router.patch('/:postId', userController.patchUser);
module.exports = router;
