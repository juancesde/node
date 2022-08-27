const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  user: config.dbUser,
  host: config.dbServer,
  database: config.dbDatabase,
  password: config.dbPassword,
  port: config.dbPort,
  ssl: {
    rejectUnauthorized: false,
}
})

const getConnection = ()  => {
  try {
    const conn = pool.query('SELECT NOW()')
    if(conn!==null){
      return pool;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = getConnection;