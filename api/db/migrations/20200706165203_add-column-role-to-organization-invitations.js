const TABLE_NAME = 'organization-invitations';
const COLUMN_NAME = 'role';

exports.up = (knex) => {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME);
  });
};

exports.down = (knex) => {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};
