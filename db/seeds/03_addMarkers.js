
exports.seed = function (knex, Promise) {
  console.log("seeding markers");
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1'),
        // Inserts seed entries
        knex('markers').insert([
          { name: 'one place to rest', address: '', lat: 45.506834, lng: -73.583722, user_id: 1, map_id: 1 },
          { name: 'second place to rest', address: '', lat: 45.503455, lng: -74, user_id: 2, map_id: 2 },
          { name: 'one place to run', address: '', lat: 45.504071, lng: -73.573074, user_id: 3, map_id: 1 },
          { name: 'second place to run', address: '', lat: 45.504108, lng: -73.570327, user_id: 1, map_id: 2 }
        ])
      ])
    })
};





