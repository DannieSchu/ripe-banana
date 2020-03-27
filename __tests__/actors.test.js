const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Actors Routes
[] `POST /actors` to create an actor
[] `GET /actors` to get all actors
  Return [{ _id, name }]
[] `GET /actors/:id` to get an actor by their id
  Return 
      {
        name,
        dob,
        pob,
        films: [{
          id,
          title,
          released
        }]
    }
*/

describe('actors routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Tobias Fünke',
        dob: Date.now(),
        pob: 'USA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Tobias Fünke',
          dob: expect.any(String),
          pob: 'USA',
          __v: 0
        });
      });
  });
});


