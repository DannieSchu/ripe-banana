const { Router } = require('express');
const Film = require('../models/Film');

// CRUD routes for films
module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .populate('studio', 'name')
      .select({ 
        title: true, 
        studio: true, 
        released: true 
      })
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', 'name')
      .populate('cast.actor', 'name')
      .populate({
        path: 'reviews',
        select: 'rating reviewer review -film',
        populate: {
          path: 'reviewer',
          select: 'name'
        } 
      })
      .then(film => res.send(film))
      .catch(next);
  });
