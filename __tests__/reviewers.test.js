const { getReviewer, getReviewers } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Reviewers Routes
[x] `POST /reviewers` to create an reviewer
[x] `GET /reviewers` to get all reviewers
  Return [{ _id, name, company }]
[x] `GET /reviewers/:id` to get an reviewer by their id
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
[] `PATCH /reviewers/:id` to update a reviewer
[] `DELETE /reviewers/:id` to delete a reviewer
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

  // TO DO: return each reviewer's reviews
  it('gets a reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('updates a reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ company: 'Washington Post' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          company: 'Washington Post'
        });
      });
  });
});
