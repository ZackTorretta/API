const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('dotenv/config');

const app = Express();
app.use(BodyParser.json());
const ProductRoute = require('./routes/routeProduct');
const UserRoute = require('./routes/routeUser');

app.use('/users', UserRoute);
app.use('/products', ProductRoute);
(async () => {
  await Mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
