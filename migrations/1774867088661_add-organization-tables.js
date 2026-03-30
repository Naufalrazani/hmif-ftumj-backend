/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable("departments", {
    id: "id",
    name: { type: "VARCHAR(100)", notNull: true },
    description: { type: "TEXT" },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("members", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    name: { type: "VARCHAR(150)", notNull: true },
    role: { type: "VARCHAR(100)", notNull: true },
    department_id: {
      type: "INTEGER",
      references: '"departments"',
      onDelete: "SET NULL",
    },
    period: { type: "VARCHAR(9)", notNull: true },
    image_url: { type: "TEXT" },
    instagram_url: { type: "VARCHAR(255)" },
    linkedin_url: { type: "VARCHAR(255)" },
    is_active: { type: "BOOLEAN", default: true },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("members", "department_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("members");
  pgm.dropTable("departments");
};
