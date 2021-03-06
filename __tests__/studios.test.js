const { getStudio, getStudios, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

// Test studio routes
describe('studios routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Barrington Media',
        address: {
          city: 'Kansas City',
          state: 'MO',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Barrington Media',
          address: {
            _id: expect.any(String),
            city: 'Kansas City',
            state: 'MO',
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('gets names and ids of all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id,
            name: studio.name
          });
        });
      });
  });

  it('gets a studio by its id', async() => {
    const studio = await getStudio();
    const films = await getFilms({ studio: studio._id });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          ...studio, 
          films: films.map(film => ({ 
            _id: film._id, 
            title: film.title 
          }))
        });
      });
  });
});
