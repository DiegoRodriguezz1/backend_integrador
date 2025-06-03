const pool = require('../db');

async function findByUsername(username) {
  const res = await pool.query('SELECT * FROM usuario WHERE username = $1', [username]);
  return res.rows[0];
}

async function findByEmail(email) {
  const res = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
  return res.rows[0];
}

async function saveUser({ username, email, contraseñaHash, nombre, apellido, rol }) {
  const res = await pool.query(
    `INSERT INTO usuario (username, email, contraseña_hash, nombre, apellido, rol)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [username, email, contraseñaHash, nombre, apellido, rol]
  );
  return res.rows[0]; // <-- Esto debe incluir el id
}

module.exports = {
  findByUsername,
  findByEmail,
  saveUser
};
