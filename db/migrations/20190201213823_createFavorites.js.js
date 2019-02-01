
exports.up = function (knex, Promise) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.foreign("user_id").references("id").on("users");
    table.integer("map_id");
    table.foreign("map_id").references("id").on("maps");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("favorites");
};
