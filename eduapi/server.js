import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import route modules
import authRoutes from './src/routes/auth.routes.js';
import courseRoutes from './src/routes/course.routes.js';
import enrollmentRoutes from './src/routes/enrollment.routes.js';
import mockTestRoutes from './src/routes/mockTest.routes.js';
import teacherRoutes from './src/routes/teacher.routes.js';
import notesRoutes from './src/routes/notes.routes.js';
import settingsRoutes from './src/routes/settings.routes.js';
import contactRoutes from './src/routes/contact.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const envPath = fs.existsSync(path.resolve(__dirname, '.env'))
  ? path.resolve(__dirname, '.env')
  : path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server and any local requests
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Gyan Prapti Academy API Server (eduapi)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/mock-tests', mockTestRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);

// Static frontend serving for production deployment (e.g. Render)
if (fs.existsSync(distPath)) {
  console.log(`📂 Serving production frontend build from ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({
        success: false,
        message: `API route not found: ${req.method} ${req.originalUrl}`
      });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Root route fallback
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Gyan Prapti Academy (GPA) REST API',
      documentation: '/api/health'
    });
  });

  // 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `API route not found: ${req.method} ${req.originalUrl}`
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
==================================================
🚀 GPA EduAPI Server is live and listening on port ${PORT}
📡 Base URL: http://localhost:${PORT}/api
🩺 Health:   http://localhost:${PORT}/api/health
==================================================
  `);
});

export default app;
