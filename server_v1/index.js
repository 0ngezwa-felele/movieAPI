// const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const cors = require("cors");
require('dotenv').config()
const API = require('./api');
const { default: axios } = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
app.use(cors())


const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://ongezwa:ongezwa@localhost:5432/my_movie';
const config = {
    connectionString: DATABASE_URL
}
if (process.env.NODE_ENV == 'production') {
  config.ssl = {
      rejectUnauthorized : false
  }
}

const pgp = PgPromise({});
const db = pgp(config);
API(app, db);





const PORT = process.env.PORT || 1420;

app.listen(PORT, function() {
  console.log(`App started on port ${PORT}`)
});