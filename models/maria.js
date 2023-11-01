const maria = require('mysql');
 
const conn = maria.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234pkj',
    database: 'project'
});
 

conn.connect((err) => {
    if (err) {
        console.error('MariaDB connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MariaDB');
});


module.exports = conn;

conn.end();

/*
// models/index.js
const { Sequelize, Op, QueryTypes } = require('sequelize');

const sequelize = new Sequelize('project', 'root', '1234pkj', {host: 'localhost', dialect: 'mysql' });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;


db.rules = require('./rules')(sequelize, Sequelize.DataTypes); // companies 대신 rules로 수정


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('성공 ~');
  })
  .catch((error) => {
    console.log('실패 ~');
    throw error;
  });

module.exports = db;
*/