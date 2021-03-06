const Express = require('express');
const bodyParser = require('body-parser');
const User = require('../services/DataBaseServices');
const TheUser = require('../models/user');

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
  const user = new TheUser(request.body);
  user.save()
    .then((data) => {
      response.status(200).json(data);
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
exports.getUser = async function (request, response) {
  response.send('SSN: blah blah');
};

// 6043ec24df255c241057cd86
// 6043ec6d83af85235ce561e1
