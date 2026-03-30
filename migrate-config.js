require("dotenv").config();

module.exports = {
  defaultConfig: {
    databaseUrl: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
  },
  migrationsDir: "migrations",
  dir: "migrations",
  tableName: "pgmigrations",
  direction: "up",
};
