// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'ghostdevelopment',
        password : 'deep70',
        database : 'ghostdevelopment',
        socketPath : "/var/run/mysqld/mysqld.sock",
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
