const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgrestql',
  host: 'dpg-d0hm3s15pdvs73eksl5g-a.oregon-postgres.render.com',
  database: 'postgresql_nz93',
  password: 'eIGK190rVbyLA1lP7q3Xu1o3qy2WXXHe',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
