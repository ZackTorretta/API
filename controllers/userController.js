const Express = require('express');
const bodyParser = require('body-parser');
const User = require('../services/DataBaseServices');
// const TheUser = require('../models/user');

const app = Express();
app.use(bodyParser.json());

/* const doActionThatMightFailValidation = async (request, response, action) => {
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
}; */
// *** POST ***

exports.postUser = async function (request, response) {
  const user = await User.pUser(request);
  user.save()
    .then((data) => {
      response.sendStatus(201).json(data);
    })
    .catch((e) => {
      response.sendStatus(
        e.code === 11000
          || e.stack.includes('ValidationError')
          || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
          ? 400 : 500,
      );
    });

  // console.log(request.body);
};

// gets back ALL posts for users
exports.getUser = async function (request, response) {
  const page = request.params.page ? request.params.page : 1;
  const limit = request.params.limit ? request.params.limit : 10;
  try {
    const users = await User.postUser({}, page, limit);
    return response.status(200).json({ status: 200, data: users, message: 'Successfully Users Retrieved' });
  } catch (e) {
    return response.status(400).json({ status: 400, message: e.message });
  }
};
// 6043ec24df255c241057cd86
// 123-45-1991
// get all based on ssn or ID
exports.getUserID = async function (request, response) {
  const page = request.params.page ? request.params.page : 1;
  const limit = request.params.limit ? request.params.limit : 10;
  try {
    const users = await User.postUser({}, page, limit);
    let foundUser = null;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in users) {
      if (users[key].id === request.params.postId) {
        foundUser = users[key];
        break;
      } else if (users[key].ssn === request.params.postId) {
        foundUser = users[key];
        break;
      }
    }
    // if statement here to simply check if it was found or not.
    // if it was found, then it prints it. if not, well 404 not found

    if (foundUser != null) {
      response.json(foundUser);
    } else {
      response.sendStatus(404);
    }
  } catch (e) {
    response.sendStatus(
      e.code === 11000
          || e.stack.includes('ValidationError')
          || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

// 6043ec24df255c241057cd86
// 6043ec6d83af85235ce561e1
