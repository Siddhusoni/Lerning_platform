const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',       // your database host
  user: 'root',            // your MySQL username
  password: '',            // your MySQL password
  database: 'news_updates' // your DB name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL Database');
});

module.exports = db;
