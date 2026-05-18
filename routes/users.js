const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(USERS_PATH, 'utf8'));
    res.send(users);
  } catch (err) {
    console.log('Erro na leitura de dados: ', err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(USERS_PATH, 'utf8'));
    users.forEach((user) => {
      if (user._id === req.params.id) {
        res.send(user);
      }
    });
  } catch (err) {
    console.log('Erro na leitura de dados: ', err);
  }
});

module.exports = router;
