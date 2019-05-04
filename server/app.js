const express = require('express'),
  bodyParser = require('body-parser');

const authRouter = require('./routes/auth'),
  usersRouter = require('./routes/users');

const app = express(),
  mainRouter = express.Router({mergeParams: true}),
  connectToMongo = require('./utils/mongo.connection');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', usersRouter);
app.use('/api', mainRouter);

app.listen(8081, connectToMongo);

//validation error handler
app.use((err, req, res, next) => {
  if (err.isBoom) {
    let errors = {};
    err.data.forEach(item => {
      let inputName = item.path.split('.').pop();
      if (inputName) errors[inputName] = item.message;
    });
    return res.status(err.output.statusCode).json(errors);
  }
});

