const Express = require('express');

const router = Express.Router();
const theController = require('../controllers/mainController');
// might not be able to find
// DOUBLE ..
// const User = require('../services/models/user');

router.post('/', theController.postUser);
router.get('/', theController.getUser);
router.get('/:postId', theController.getUserID);
router.delete('/:postId', theController.deleteUser);
router.patch('/:postId', theController.patchUser);

module.exports = router;
