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
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });

    res.status(201).send(newUser);
  } catch (err) {
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
