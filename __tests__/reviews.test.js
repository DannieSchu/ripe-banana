const { getReview, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Reviews Routes
[] `POST /reviews` to create an review
[] `GET /reviews` to get 100 highest rated reviews
  Return [{
    _id,
    rating,
    review,
    film: { _id, title }
  }]
[] `PATCH /reviews/:id` to update a review
[] `DELETE /reviews/:id` to delete a review
*/

describe('review routes', () => {
  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        review: 'The actors play it big and bold in a visually striking, black and white horror show.',
        film: {
          title: 'The Lighthouse'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          review: 'The actors play it big and bold in a visually striking, black and white horror show.',
          film: {
            _id: expect.any(String),
            title: 'The Lighthouse'
          },
          __v: 0
        });
      });
  });
});
