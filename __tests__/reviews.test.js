const { getReview, getReviewer, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

// Test review routes
describe('review routes', () => {
  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        review: 'The actors play it big and bold in a visually striking, black and white horror show.',
        reviewer: reviewer._id,
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          review: 'The actors play it big and bold in a visually striking, black and white horror show.',
          reviewer: reviewer._id,
          film: film._id,
          __v: 0
        });
      });
  });

  it('gets top 100 reviews', () => {    
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body.length).toEqual(100);
        expect(res.body).toContainEqual({ 
          _id: expect.any(String),
          rating: expect.any(Number),
          review: expect.any(String),
          film: expect.any(Object),
        });
      });
  });

  it('deletes a review', async() => {
    const review = await getReview();

    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});
