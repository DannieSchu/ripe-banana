const { getFilm, getFilms, getStudio, getActor, getActors, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

// Test film routes
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
 
  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id, 
            title: film.title, 
            released: film.released,
            studio: { 
              _id: film.studio, 
              name: expect.any(String)
            }
          });
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    const reviews = await getReviews({ film: film._id });
    const studio = await getStudio({ _id: film.studio });
    const actors = await getActors({ _id: { $in: film.cast.map(castMember => castMember.actor) } });
    
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          ...film, 
          studio: { 
            _id: film.studio, 
            name: studio.name
          },
          reviews: reviews.map(review => ({
            _id: review._id,
            rating: review.rating,
            review: review.review,
            reviewer: { 
              _id: review.reviewer, 
              name: expect.any(String),
            },
          })),
          cast: [{
            _id: film.cast[0]._id,
            role: film.cast[0].role,
            actor: { 
              _id: actors[0]._id, 
              name: actors[0].name 
            }
          }]
        });
      });
  });
});
