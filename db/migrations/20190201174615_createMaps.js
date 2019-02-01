
exports.up = function (knex, Promise) {

  return knex.schema.createTable("maps", table => {
    table.increments("id").primary().unsigned();
    table.string("name").notNull();
    table.text("description");// text is a sentence
    table.float("lat");
    table.float("lng");
    table.integer("zoom");
    table.integer("user_id");
    table.foreign("user_id").references("id").on("users");
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("maps");
};
