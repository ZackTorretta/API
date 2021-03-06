// don't have HTTP response codes in here (service)
const User = require('../models/user');

exports.postUser = async function (query, page, limit) {
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
