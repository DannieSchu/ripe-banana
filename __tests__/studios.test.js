require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Studios Routes
[] `POST /studios` to create a studio
[] `GET /studios` to get all studios
  Returns [{ _id, name }]
[] `GET /studios/:id` to get a studio by its id
  Returns { _id, name, address, films: [{ _id, title }] }
*/

describe('studios routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Barrington Media',
        address: { 
          city: 'Kansas City', 
          state: 'MO', 
          country: 'USA' }
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
});
