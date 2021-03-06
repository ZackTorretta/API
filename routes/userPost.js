const express = require('express');

const router = express.Router();

router.get('/posts');

// might not be able to find

const User = require('./services/models/user');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};
router.post('/posts', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
});

router.post('/', async (request, response) => {
  response.send('We are on posts');
});

module.exports = router;
