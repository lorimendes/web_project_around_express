const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const CARDS_PATH = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', async (req, res, next) => {
  try {
    const cards = JSON.parse(await fs.readFile(CARDS_PATH, 'utf8'));
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
