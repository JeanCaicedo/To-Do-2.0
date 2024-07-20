const mongoose = require('mongoose');

const invalidTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // El token se eliminará después de 1 hora
});

module.exports = mongoose.model('InvalidToken', invalidTokenSchema);
