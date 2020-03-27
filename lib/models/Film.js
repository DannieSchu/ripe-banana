const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: {
      type: String
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', schema);
