exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    // Inserts seed entries
    .then(function () {
      return Promise.all([
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
        Promise.all([
          knex('users').insert({ name: 'Alice' }),
          knex('users').insert({ name: 'Jacob' }),
          knex('users').insert({ name: 'Franny' }),
        ])
      ])
    })
};
