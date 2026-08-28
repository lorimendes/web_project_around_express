const router = require('express').Router();
const Card = require('../models/card');

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:cardId', async (req, res, next) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    res.status(200).send(deletedCard);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
