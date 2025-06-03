const express = require('express');
const {
  getCategoriasByUsuario,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoriaById,
} = require('../models/categoria');

const router = express.Router();

router.get('/', async (req, res) => {
  const usuario_id = parseInt(req.query.usuario_id);
  if (!usuario_id) return res.status(401).json({ message: 'usuario_id requerido' });
  const categorias = await getCategoriasByUsuario(usuario_id);
  res.json(categorias);
});

router.post('/', async (req, res) => {
  const { color_hex, nombre, usuario_id } = req.body;
  if (!usuario_id) return res.status(401).json({ message: 'usuario_id requerido' });
  if (!color_hex || !nombre) return res.status(400).json({ message: 'color_hex y nombre requeridos' });
  const categoria = await createCategoria({ color_hex, nombre, usuario_id });
  res.json(categoria);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { color_hex, nombre } = req.body;
  const cat = await getCategoriaById(id);
  if (!cat) return res.status(404).json({ message: 'Categoría no encontrada' });
  const categoria = await updateCategoria(id, { color_hex, nombre });
  res.json(categoria);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await getCategoriaById(id);
  if (!cat) return res.status(404).json({ message: 'Categoría no encontrada' });
  await deleteCategoria(id);
  res.json({ message: 'Categoría eliminada' });
});

module.exports = router;