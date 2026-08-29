const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userFromId = await User.findById(req.params.userId).orFail();
    res.send(userFromId);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'ID do usuário inválido' });
      return;
    }
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });

    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Dados incompletos ou inválidos' });
      return;
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { returnDocument: 'after', runValidators: true },
    ).orFail();
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
      return;
    }
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Dados incompletos ou inválidos' });
      return;
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { returnDocument: 'after', runValidators: true },
    ).orFail();
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
      return;
    }
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Link inválido' });
      return;
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
