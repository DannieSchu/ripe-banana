const { Router } = require('express');
const Actor = require('../models/Actor');

// CRUD routes for actors
module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ name: true })
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', { studio: false, cast: false })
      .then(actor => res.send(actor)) 
      .catch(next);
  });
