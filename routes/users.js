const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

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

router.post();

module.exports = router;
