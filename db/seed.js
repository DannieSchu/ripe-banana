const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 5, actorsToCreate = 25, reviewersToCreate = 50, filmsToCreate = 10 } = {}) => {

  const studioEndings = ['Universal', 'Studios', 'Media', 'Pictures', 'Group', 'Entertainment'];

  const studio = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.capitalize(chance.word())} ${chance.pickone(studioEndings)}`,
    address: { city: chance.city(), state: chance.state(), country: chance.country() }
  })));

  const actor = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.country({ full: true })
  })));

  await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.pickone([chance.company(), chance.domain()])
  })));

  await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.animal(),
    studio: studio,
    released: parseInt(chance.year({ min: 1900, max: 2020 })),
    cast: [{ role: chance.name(), actor: actor }]
  })));
};
