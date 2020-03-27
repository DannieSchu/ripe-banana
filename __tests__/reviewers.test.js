const { getReviewer, getReviewers } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Reviewers Routes
[x] `POST /reviewers` to create an reviewer
[] `GET /reviewers` to get all reviewers
  Return [{ _id, name, company }]
[] `GET /reviewers/:id` to get an reviewer by their id
  Return 
    {
      _id,
      name,
      company,
      reviews: [{
          _id,
          rating,
          review,
          film: { _id, title }
      }]
  }
*/

describe('reviewers routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Charlotte O\'Sullivan',
        company: 'London Evening Standard'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Charlotte O\'Sullivan',
          company: 'London Evening Standard',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });
});
