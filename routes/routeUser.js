const Express = require('express');

const router = Express.Router();
const userController = require('../controllers/userController');
// might not be able to find
// DOUBLE ..
// const User = require('../services/models/user');

router.post('/', userController.postUser);
router.get('/', userController.getUser);

module.exports = router;
/* router.post('/posts', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
}); */

/* router.get('/SSN', async (request, response) => {
  response.send('SSN: blah blah');
}); */

module.exports = router;
