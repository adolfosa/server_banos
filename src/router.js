const express = require('express');
const router = express.Router();
const { imprimirTicket } = require('./printService');

router.post('/api/print', express.json(), async (req, res) => {
  try {
    const resultado = await imprimirTicket(req.body);
    res.json({ success: true, message: resultado });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
