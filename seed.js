require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ authorsToCreate: 100, booksToCreate: 1000 })
  .then(() => console.log('done'));
