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
  pgm.createTable("audit_logs", {
    id: {
      type: "SERIAL",
      primaryKey: true,
    },
    admin_name: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    action: {
      type: "VARCHAR(20)",
      notNull: true,
    },
    target: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("audit_logs", "created_at");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("audit_logs");
};
