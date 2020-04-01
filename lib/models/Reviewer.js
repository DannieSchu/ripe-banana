const mongoose = require('mongoose');

// Reviewer model
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

// Connect reviewer's reviews
schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

// Conditionally delete reviewer 
schema.statics.deleteIfNoReviews = function(id) {
  // find reviews that have matching reviewer
  return this.model('Review')
    .find({ reviewer: id })
    // delete reviewer if no reviews; otherwise, throw an error
    .then(reviews => {
      return reviews.length < 1 ? this.findByIdAndDelete(id) : function() { throw Error('Cannot delete reviewer that has reviews.'); }();
    });
};

module.exports = mongoose.model('Reviewer', schema);
