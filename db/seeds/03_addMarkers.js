
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      // Inserts seed entries
      return knex('markers').insert([
        { name: '', address: '', lat: '', lng: '', user_id: '', map_id: '' },
        { name: '', address: '', lat: '', lng: '', user_id: '', map_id: '' },
        { name: '', address: '', lat: '', lng: '', user_id: '', map_id: '' }
      ]);
    });
};
