const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
    host: 'mariadb',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'simpleHack'
  });

module.exports = conn;