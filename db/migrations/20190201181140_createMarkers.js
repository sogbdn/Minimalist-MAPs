
exports.up = function (knex, Promise) {

  return knex.schema.createTable("markers", table => {
    table.increments("id").primary().unsigned();
    table.string("name").notNull();
    table.text("address");
    table.float("lat");
    table.float("lng");
    table.integer("user_id");
    table.foreign("user_id").references("id").on("users");
    table.integer("map_id");
    table.foreign("map_id").references("id").on("maps");
  }
  )
};


exports.down = function (knex, Promise) {
  return knex.schema.dropTable("markers");
};

