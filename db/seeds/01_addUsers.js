exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    // Inserts seed entries
    .then(function () {
      return Promise.all([
        knex('users').insert({ name: '' }),
        knex('users').insert({ name: '' }),
        knex('users').insert({ name: '' })
      ]);
    });
};
