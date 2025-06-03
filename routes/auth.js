const express = require('express');
const bcrypt = require('bcrypt');
const { findByUsername, findByEmail, saveUser } = require('../models/usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, nombre, apellido } = req.body;

    if (await findByUsername(username)) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    if (await findByEmail(email)) {
      return res.status(400).json({ message: 'El correo electrónico ya existe' });
    }

    const contraseñaHash = await bcrypt.hash(password, 10);

    // Guardar usuario y obtener el id
    const user = await saveUser({
      username,
      email,
      contraseñaHash,
      nombre,
      apellido,
      rol: 'USER'
    });

    // Crear categorías por defecto
    const { createCategoria } = require('../models/categoria');
    await createCategoria({ color_hex: '#2196F3', nombre: 'Personal', usuario_id: user.id });
    await createCategoria({ color_hex: '#4CAF50', nombre: 'Trabajo', usuario_id: user.id });

    res.json({ message: 'Usuario registrado exitosamente', usuario: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(password, user.contraseña_hash);
    if (!valid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Login exitoso',
      username: user.username,
      rol: user.rol
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
