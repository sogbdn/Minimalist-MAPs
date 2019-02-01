
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        { name: '', description: '', lat: '', lng: '', zoom: '', user_id: '' },
        { name: '', description: '', lat: '', lng: '', zoom: '', user_id: '' },
        { name: '', description: '', lat: '', lng: '', zoom: '', user_id: '' },
      ]);
    });
};
