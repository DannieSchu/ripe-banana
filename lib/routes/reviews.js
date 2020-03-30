const { Router } = require('express');
const Review = require('../models/Review');

// CRUD routes for reviews
module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .topReviews()
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
  
