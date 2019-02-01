knex('users')
  .insert({ email: 'hi@example.com' })


  // Initialize the library
var knex = require('knex')({
  client: 'pg',
  connection: {
    "user": "development",
    "password": "development",
    "database": "map_db",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  },
  searchPath: ['knex', 'public'],
});

knex.schema.createTable('maps', table => {
  table.increments('id')
  table.string('name')
  table.string('description')
  table.integer('lat')
  table.integer('lng')
  table.integer('zoom')
  table.integer("user_id")
})

knex.schema.createTable('pins', (table) => {
  table.increments('id')
  table.string('name')
  table.string('description')
  table.string('image')
  table.integer('lat')
  table.integer('lng')
  table.string('owner')
  table.string('color')
})

knex.schema.createTable('users', table => {
  table.increments('id')
  table.string('name')
  table.integer('map_id')
  table.integer('profile')
  table.integer('user_id')
  table.string('contribution')
})

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = new Date('06-06-1986');

knex('maps')
  .insert({ id: , name: , description: , image: , lat: , lng: , owner: , color: })
  .asCallback(function (err, rows) {
    if (err) return console.error(err);
    console.log(`Insert done on ${rows.rowCount} rows`)
    knex.destroy();
  });