import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import studentRoutes from './routes/student.routes';
import reportRoutes from './routes/report.routes';
import rankingRoutes from './routes/ranking.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

// ── Middleware ───────────────
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173').split(',');

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/students', studentRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/top10', rankingRoutes);

// ── Error Handling ──────────
app.use(notFound);
app.use(errorHandler);

// ── Bootstrap ────────────────────────
const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 G-Scores API running on http://localhost:${PORT}`);
    console.log(`   ENV: ${process.env.NODE_ENV ?? 'development'}`);
  });
};

bootstrap();

export default app;
