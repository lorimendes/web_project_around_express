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

module.exports = router;
