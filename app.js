const express = require('express');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

const handleRouteNotFound = (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
};

const handleError = (err, req, res, next) => {
  res.status(500).send({ message: 'Ocorreu um erro no servidor' });
};

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(handleRouteNotFound);
app.use(handleError);

app.listen(PORT, () => {});
