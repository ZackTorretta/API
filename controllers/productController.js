// const crypto = require('crypto');
// functions from route moved in here. FUNCTIONS LIVE HERE
// const ProductService = require('../services/models/productModel');
const Product = require('../models/productModel');

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
// *** POST ***
exports.postProducts = async function (request, response) {
  await doActionThatMightFailValidation(request, response, async () => {
    await new Product(request.body).save();
    response.sendStatus(201);
  });
};

/*
const salt = crypto.randomBytes(16).toString('base64');
const hash = crypto.createHmac('sha512', salt).update(request.body.password).digest('base64');
request.body.password = `${salt}$${hash}`;
request.body.permissionLevel = 1;
ProductService.createProduct(request.body).then((result)); */
/* const page = request.params.page ? request.params.page : 1;
const limit = request.params.limit ? request.params.limit : 10;
try {
  const users = await ProductService.getUsers({}, page, limit);
  return response.status(200).json({
  status: 200, data: users, message: 'Succesfully Users Retrieved' });
} catch (e) {
  return response.status(400).json({ status: 400, message: e.message });
} */
