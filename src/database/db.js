const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
  // create database
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
})

module.exports = db
