const express = require('express');
const path = require('path');

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
//const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

const { PORT = 3000 } = process.env;
const app = express();

//app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Success! App listening at port ${PORT}.`);
});
