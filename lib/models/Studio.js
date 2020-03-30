const mongoose = require('mongoose');

// Model for studio address
const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String
});

// Studio model
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: addressSchema
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

// Connect studio's films
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studio', schema);
