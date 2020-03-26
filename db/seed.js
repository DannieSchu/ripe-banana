const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 5 } = {}) => {

  const studioEndings = ['Universal', 'Studios', 'Media', 'Pictures', 'Group', 'Entertainment'];

  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.capitalize(chance.word())} ${chance.pickone(studioEndings)}`,
    address: { city: chance.city(), state: chance.state(), country: chance.country() }
  })));
};
