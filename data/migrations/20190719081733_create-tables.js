
exports.up = function(knex) {
  return knex.schema 
  .createTable('projects', tbl => {
      tbl.increments();
      tbl.text('name', 128)
       .notNullable();
      tbl.text('description', 256)
      tbl.boolean('completed')
       .notNullable()

  })
  .createTable('actions', tbl => {
      tbl.increments();
      tbl.text('description', 256).notNullable()
      tbl.text('notes', 256);
      tbl.boolean('completed').notNullable();
      tbl.integer('projectID')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema    
    .dropTableIfExists('projects')
    .dropTableIfExists('actions')
};
