const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

// method on Reviewer model
schema.methods.deleteIfNoReviews = function() {
  // find reviews that have matching reviewer
  return this.model('Review')
    .find({ reviewer: this.reviewer })
    // delete reviewer if no reviews; otherwise, throw an error
    .then(reviews => {
      return reviews.length === 0 ? this.findByIdAndDelete(this.reviews) : () => { throw Error('Cannot delete reviewer that has reviews.'); };
    });
};

module.exports = mongoose.model('Reviewer', schema);
