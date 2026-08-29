const express = require('express');
const mongoose = require('mongoose');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');

//solução temporária
const createUserId = (req, res, next) => {
  req.user = {
    _id: '6a92398f60cab053e3c65c38'
  };
  next();
};

const handleRouteNotFound = (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
};

const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Ocorreu um erro no servidor' });
};

app.use(express.json());
app.use(createUserId);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(handleRouteNotFound);
app.use(handleError);

app.listen(PORT, () => {});
