const { getFilm, getFilms, getStudio, getStudios, getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

/* Film Routes
[x] `POST /films` to create a film
[x] `GET /films` to get all films
  Return [{
    _id, 
    title, 
    released,
    studio: { _id, name }
}]
[] `GET /films/:id` to get a film by its id
  Return 
      {
    title,
    studio: { _id, name },
    released,
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
 
  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(async film => {
          const studio = await getStudio({ _id: film.studio });
          expect(res.body).toContainEqual({
            ...film,
            studio: { 
              _id: film.studio, 
              name: studio.name
            }
          });
        });
      });
  });

  // TO DO: populate reviews from virtual
//   it('gets a film by id', async() => {
//     const film = await getFilm();
//     const studio = await getStudio({ _id: { $in: film.studio } });
//     const actors = await getActors({ _id: { $in: film.cast.map(castMember => castMember.actor) } });

//     return request(app)
//       .get(`/api/v1/films/${film._id}`)
//       .then(res => {
//         expect(res.body).toEqual({ 
//           ...film, 
//           studio: { 
//             _id: film.studio, 
//             name: studio.name
//           },
//           cast: film.cast.map((castMember, i) => ({ ...castMember, actor: actors[i].name }))
//         });
//       });
//   });
});
