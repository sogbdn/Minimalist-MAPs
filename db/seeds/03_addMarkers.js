
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      // Inserts seed entries
      return knex('markers').insert([
        { name: 'one place to rest', address: '', lat: '45.506834', lng: '-73.583722', user_id: '', map_id: 'map1' },
        { name: 'second place to rest', address: '', lat: '45.503455', lng: '-73.579533', user_id: '', map_id: 'map1' },
        { name: 'one place to run', address: '', lat: '45.504071', lng: '-73.573074', user_id: '', map_id: 'map2' }
        { name: 'second place to run', address: '', lat: '45.504108', lng: '-73.570327', user_id: '', map_id: 'map2' }
      ]);
    });
};





