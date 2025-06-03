const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const categoriasRoutes = require('./routes/categorias');
const tareasEventosRoutes = require('./routes/tareas_eventos');
const notificacionesRoutes = require('./routes/notificaciones');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/tareas_eventos', tareasEventosRoutes);
app.use('/api/notificaciones', notificacionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
