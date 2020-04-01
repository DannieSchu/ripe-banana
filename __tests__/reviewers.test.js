const { getReviewer, getReviewers, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

// Test reviewer routes
describe('reviewer routes', () => {
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

  it('gets a reviewer', async() => {
    const reviewer = await getReviewer();
    const reviews = await getReviews({ reviewer: reviewer._id });

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews
        });
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

  it('deletes a reviewer that has no reviews', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Charlotte O\'Sullivan',
        company: 'London Evening Standard'
      })
      .then(reviewer => {
        return request(app)
          .delete(`/api/v1/reviewers/${reviewer.body._id}`);
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

  it('throws an error if the user has reviews', async() => {
    const reviewer = await getReviewer();
  
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'Cannot delete reviewer that has reviews.', status: 500 });
      });
  });
});
