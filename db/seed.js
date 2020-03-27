const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50 } = {}) => {

  const studioEndings = ['Universal', 'Studios', 'Media', 'Pictures', 'Group', 'Entertainment'];

  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.capitalize(chance.word())} ${chance.pickone(studioEndings)}`,
    address: { city: chance.city(), state: chance.state(), country: chance.country() }
  })));

  await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.country({ full: true })
  })));
};
