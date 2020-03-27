const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Actors Routes
[x] `POST /actors` to create an actor
[x] `GET /actors` to get all actors
  Return [{ _id, name }]
[x] `GET /actors/:id` to get an actor by their id
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

  it('gets names and ids of all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id,
            name: actor.name
          });
        });
      });
  });

  // TO DO: return each actor's films
  it('gets a single actor', async() => {
    const actor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
});


