const mongoose = require('mongoose');

// Review model
const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxLength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

// Return 100 highest reviews (excl. reviewer)
schema.statics.topReviews = function() {
  return this.aggregate([
    {
      '$sort': {
        'rating': -1
      }
    }, {
      '$limit': 100
    }, {
      '$lookup': {
        'from': 'films',
        'localField': 'film',
        'foreignField': '_id',
        'as': 'film'
      }
    }, {
      '$unwind': {
        'path': '$film'
      }
    }, {
      '$project': {
        'rating': true,
        'review': true,
        'film': {
          '_id': true,
          'title': true
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Review', schema);

