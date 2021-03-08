// don't have HTTP response codes in here (service)
const Express = require('express');
const BodyParser = require('body-parser');
const User = require('../models/user');
const Product = require('../models/product');

const app = Express();
app.use(BodyParser.json());
// service for gets

exports.getUser = async function (query, request, page, limit) {
  try {
    if (request.baseUrl === '/users') {
      const users = await User.find(query);
      return users;
    }
    const theProduct = await Product.find(query);
    return theProduct;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
// service for posts
exports.pUser = async function (request) {
  try {
    if (request.baseUrl === '/users') {
      const theUser = new User(request.body);
      return theUser;
    }
    const theProduct = new Product(request.body);
    return theProduct;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

exports.rUser = async function (request) {
  console.log('inside delete');
  try {
    if (request.baseUrl === '/users') {
      console.log('inside users');
      const removeUser = await User.remove({ ssn: request.params.postId });
      return removeUser;
    }
    console.log(request.params.postId);
    const removeProduct = await Product.remove({ sku: request.params.postId });
    return removeProduct;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
exports.patchUser = async function (request) {
  try {
    // console.log(request);=
    // eslint-disable-next-line no-restricted-syntax
    if (request.baseUrl === '/users') {
      const updateUser = await User.updateMany({ ssn: request.params.postId },
        {
          $set: { ssn: request.body.ssn },
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          age: request.body.age,
          address: request.body.address,
          phone: request.body.phone,
        });
      return updateUser;
    }
    const updateProduct = await Product.updateMany({ sku: request.params.postId },
      {
        $set: { sku: request.body.sku },
        name: request.body.name,
        quantity: request.body.quantity,
        price: request.body.price,
      });
    return updateProduct;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
