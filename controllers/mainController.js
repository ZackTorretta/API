const Express = require('express');
const bodyParser = require('body-parser');
const User = require('../services/DataBaseServices');
// const TheUser = require('../models/user');

const app = Express();
app.use(bodyParser.json());

exports.postUser = async (request, response) => {
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
    const users = await User.getUser({}, request, page, limit);
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
    const users = await User.getUser({}, request, page, limit);
    let foundUser = null;
    console.log(request.baseUrl);
    if (request.baseUrl === '/users') {
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
    } else {
      console.log('inside else (products)');
      // HAD TO CONVERT THIS INTO STRING BECAUSE THE SKU IS INTEGER
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const key in users) {
        JSON.parse(users[key].sku);
        const x = JSON.stringify(users[key].sku);
        console.log(x);
        if (x === request.params.postId) {
          foundUser = users[key];
          break;
        }
      }
    }
    console.log(foundUser);
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
// delete user by giving SSN
exports.deleteUser = async function (request, response) {
  try {
    const user = await User.rUser(request);
    console.log(user);
    response.sendStatus(200).json(user);
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

// patches

exports.patchUser = async function (request, response) {
  try {
    const user = await User.patchUser(request);
    response.sendStatus(200).json(user);
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
  /* const user = await User.rUser(request);
  response.sendStatus(200).json(user); */
};

// 6043ec24df255c241057cd86
// 6043ec6d83af85235ce561e1
