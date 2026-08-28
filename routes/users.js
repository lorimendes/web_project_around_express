const router = require('express').Router();

const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userFromId = await User.findById(req.params.userId);

    if (userFromId) {
      res.send(userFromId);
    } else {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = await User.create({ name, about, avatar });

    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
