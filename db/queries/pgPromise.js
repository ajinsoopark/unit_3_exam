const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost:5432/marine');

module.exports =  { db };