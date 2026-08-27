const mongoose = require('mongoose');

const userSquema = new mongoose.Squema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9\._~:\/\?%#\[\]@!\$&'\(\)\*\+,;=]+$/.test(
          v
        );
      },
      message: 'Link inválido'
    }
  }
});

const user = mongoose.model('user', userSquema);

module.exports = user;
