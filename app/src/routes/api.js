const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Inisialisasi Pool koneksi ke PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'devops_db',
});

// GET /health - Health check termasuk status koneksi DB
router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'degraded',
      database: 'disconnected',
      error: err.message
    });
  }
});

// GET /api/info
router.get('/api/info', (req, res) => {
  res.status(200).json({
    app: 'devops-microservice-api',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    db_host: process.env.DB_HOST || 'localhost'
  });
});

module.exports = router;