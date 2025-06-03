const express = require('express');
const {
  getTareasEventosByUsuario,
  createTareaEvento,
  updateTareaEvento,
  deleteTareaEvento,
  getTareaEventoById,
} = require('../models/tarea_evento');

const router = express.Router();

router.get('/', async (req, res) => {
  const usuario_id = parseInt(req.query.usuario_id);
  if (!usuario_id) return res.status(401).json({ message: 'usuario_id requerido' });
  const tareas = await getTareasEventosByUsuario(usuario_id);
  res.json(tareas);
});

router.post('/', async (req, res) => {
  const data = req.body;
  // Convertir a número si viene como string
  data.usuario_id = Number(data.usuario_id);
  data.categoria = Number(data.categoria);

  if (!data.usuario_id) return res.status(401).json({ message: 'usuario_id requerido y debe ser número' });
  if (!data.titulo || !data.fecha_inicio || !data.fecha_fin) {
    return res.status(400).json({ message: 'titulo, fecha_inicio y fecha_fin requeridos' });
  }
  if (typeof data.recordatorio !== 'boolean') {
    return res.status(400).json({ message: 'recordatorio debe ser boolean' });
  }
  if (!data.categoria) {
    return res.status(400).json({ message: 'categoria debe ser número' });
  }
  const tarea = await createTareaEvento(data);
  res.json(tarea);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = await getTareaEventoById(id);
  if (!tarea) return res.status(404).json({ message: 'Tarea/Evento no encontrado' });
  const updated = await updateTareaEvento(id, req.body);
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = await getTareaEventoById(id);
  if (!tarea) return res.status(404).json({ message: 'Tarea/Evento no encontrado' });
  await deleteTareaEvento(id);
  res.json({ message: 'Tarea/Evento eliminado' });
});

module.exports = router;