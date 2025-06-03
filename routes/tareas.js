const express = require('express');
const bcrypt = require('bcrypt');
const { findByUsername, findByEmail, saveUser } = require('../models/usuario');

const router = express.Router();

router.post("/mandarTarea", async (req, res) => {
    
})

module.exports = router;
