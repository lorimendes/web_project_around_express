const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

const showError = (err) => {
  console.log('Erro na leitura de dados: ', err);
};

const getUsers = async () => {
  const data = await fs.readFile(USERS_PATH, 'utf8');
  return JSON.parse(data);
};

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    console.log(users);
    res.send(users);
  } catch (err) {
    showError(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const users = await getUsers();

    const userFromId = users.find((user) => user._id === req.params.id);

    if (userFromId) {
      res.send(userFromId);
    } else {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
    }
  } catch (err) {
    showError(err);
  }
});

module.exports = router;
