const chance = require('chance').Chance();

// Import models
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

// Seed database with random data
module.exports = async({ 
  studiosToCreate = 5, 
  actorsToCreate = 25, 
  reviewersToCreate = 20, 
  filmsToCreate = 10, 
  reviewsToCreate = 110 
} = {}) => {
  const studioEndings = ['Universal', 'Studios', 'Media', 'Pictures', 'Group', 'Entertainment'];

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.capitalize(chance.word())} ${chance.pickone(studioEndings)}`,
    address: { city: chance.city(), state: chance.state(), country: chance.country() }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.country({ full: true })
  })));

  const reviewer = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.pickone([chance.company(), chance.domain()])
  })));

  const film = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.animal(),
    studio: chance.pickone(studios)._id,
    released: parseInt(chance.year({ min: 1900, max: 2020 })),
    cast: [{ 
      role: chance.name(), 
      actor: chance.pickone(actors)._id 
    }]
  })));

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewer)._id,
    review: chance.sentence({ sentences: 3 }),
    film: chance.pickone(film)._id
  })));
};
