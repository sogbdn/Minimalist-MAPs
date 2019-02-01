exports.seed = function (knex, Promise) {
  console.log("seeding favorites");
  // Deletes ALL existing entries
  return knex('favorites').del()
    // Inserts seed entries
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE favorites_id_seq RESTART WITH 1'),
        knex('favorites').insert({ map_id: 1, user_id: 1 }),
        knex('favorites').insert({ map_id: 2, user_id: 1 }),
        knex('favorites').insert({ map_id: 1, user_id: 2 })
      ])
    })
};
