
exports.up = function(knex, Promise) {
    return knex.schema.createTable('csvupload', table => {
        table.increments('id').primary();
        table.string('file_type');
        table.string('uploaded_file');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('csvupload');
};
