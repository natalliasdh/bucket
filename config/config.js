module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "buhkitdb",
    host: "127.0.0.1",
    dialect: "mysql",
    secret: process.env.MY_SECRET
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    secret: process.env.MY_SECRET
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    secret: process.env.MY_SECRET
  }
};
