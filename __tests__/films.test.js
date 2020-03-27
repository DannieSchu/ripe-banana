const { getFilm, getFilms, getStudio, getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Film Routes
[] `POST /films` to create a film
[] `GET /films` to get all films
  Return [{
    _id, title, released,
    studio: { _id, name }
}]
[] `GET /films/:id` to get a film by its id
  Return 
      {
    title,
    released,
    studio: { _id, name },
    cast: [{
        _id,
        role,
        actor: { _id, name }
    }],
    reviews: [{
        id,
        rating,
        review,
        reviewer: { _id, name }
    ]
}
*/

describe('film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();

    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'The Lighthouse',
        studio: studio._id,
        released: 2019,
        cast: [{
          role: 'Thomas Howard',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'The Lighthouse',
          studio: studio._id,
          released: 2019,
          cast: [{
            _id: expect.any(String),
            role: 'Thomas Howard',
            actor: actor._id
          }],
          __v: 0
        });
      });
  });
});
