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
    console.error(err);
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    res.status(200).send(deletedCard);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { getCards, createCard, deleteCard };
