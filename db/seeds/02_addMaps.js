
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1'),
        // Inserts seed entries
        knex('maps').insert([
          { name: 'map1', description: 'somewhere to rest', lat: 45.493965, lng: -73.576845, zoom: 15, user_id: 1 },
          { name: 'map2', description: 'somewhere to run', lat: 45.495935, lng: -73.573444, zoom: 15, user_id: 2 },
          { name: 'map3', description: 'somewhere to hide', lat: 45.505857, lng: -73.584183, zoom: 15, user_id: 3 },
        ])
      ])
    })
};
