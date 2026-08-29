const Card = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Dados incompletos ou inválidos' });
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(
      req.params.cardId
    ).orFail();
    res.status(200).send(deletedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'ID do card inválido' });
      return;
    } else if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do card não encontrado' });
      return;
    }
    next(err);
  }
};

const addLike = async (req, res, err) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { returnDocument: 'after', runValidators: true }
    ).orFail();
    res.status(200).send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'ID do card inválido' });
      return;
    } else if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do card não encontrado' });
      return;
    }
    next(err);
  }
};

const deleteLike = async (req, res, err) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { returnDocument: 'after', runValidators: true }
    ).orFail();
    res.status(200).send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'ID do card inválido' });
      return;
    } else if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'ID do card não encontrado' });
      return;
    }
    next(err);
  }
};

module.exports = { getCards, createCard, deleteCard, addLike, deleteLike };
