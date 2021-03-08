const Express = require('express');
const theController = require('../controllers/mainController');

const router = Express.Router();

router.post('/', theController.postUser);
router.get('/', theController.getUser);
router.get('/:postId', theController.getUserID);
router.delete('/:postId', theController.deleteUser);
router.patch('/:postId', theController.patchUser);
module.exports = router;
