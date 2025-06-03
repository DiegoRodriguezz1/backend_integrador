const express = require('express');
const bcrypt = require('bcrypt');
const { findByUsername, findByEmail, saveUser } = require('../models/usuario');
const {
  getNotificacionesByUsuario,
  createNotificacion,
  updateEstadoNotificacion,
  getNotificacionById,
} = require('../models/notificacion');

const router = express.Router();

router.post("/mandarNotificacion", async (req, res) => {

})

router.get('/', async (req, res) => {
  const usuario_id = parseInt(req.query.usuario_id);
  if (!usuario_id) return res.status(401).json({ message: 'usuario_id requerido' });
  const notificaciones = await getNotificacionesByUsuario(usuario_id);
  res.json(notificaciones);
});

router.post('/', async (req, res) => {
  const { estado, fecha_envio, mensaje, usuario_id } = req.body;
  if (!usuario_id) return res.status(401).json({ message: 'usuario_id requerido' });
  if (!mensaje) return res.status(400).json({ message: 'mensaje requerido' });
  const notificacion = await createNotificacion({
    estado: estado || 'nueva',
    fecha_envio: fecha_envio || new Date().toISOString(),
    mensaje,
    usuario_id,
  });
  res.json(notificacion);
});

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { estado } = req.body;
  const notif = await getNotificacionById(id);
  if (!notif) return res.status(404).json({ message: 'Notificación no encontrada' });
  const updated = await updateEstadoNotificacion(id, estado);
  res.json(updated);
});

module.exports = router;
