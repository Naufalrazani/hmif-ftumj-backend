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
  pgm.createTable("activities", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    title: { type: "VARCHAR(255)", notNull: true },
    description: { type: "TEXT", notNull: true },
    date: { type: "DATE", notNull: true },
    department: { type: "VARCHAR(10)" },
    status: { type: "VARCHAR(20)", notNull: true },
    image_url: { type: "TEXT" },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("articles", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    title: { type: "VARCHAR(255)", notNull: true },
    slug: { type: "VARCHAR(255)", notNull: true, unique: true },
    content: { type: "TEXT", notNull: true },
    category: { type: "VARCHAR(50)", notNull: true },
    thumbnail_url: { type: "TEXT" },
    is_published: { type: "BOOLEAN", default: false },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("informationall", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    title: { type: "VARCHAR(255)", notNull: true },
    type: { type: "VARCHAR(50)", notNull: true },
    deadline: { type: "TIMESTAMP" },
    thumbnail_url: { type: "TEXT" },
    link_registration: { type: "TEXT" },
    description: { type: "TEXT" },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("subscribers", {
    id: "id",
    email: { type: "VARCHAR(255)", notNull: true, unique: true },
    is_active: { type: "BOOLEAN", default: true },
    subscribed_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("informationall");
  pgm.dropTable("articles");
  pgm.dropTable("activities");
  pgm.dropTable("subscribers");
};
