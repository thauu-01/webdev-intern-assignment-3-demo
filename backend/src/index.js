const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const studentRoutes = require('./routes/student.routes').default || require('./routes/student.routes');
const reportRoutes = require('./routes/report.routes').default || require('./routes/report.routes');
const rankingRoutes = require('./routes/ranking.routes').default || require('./routes/ranking.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { notFound } = require('./middlewares/notFound');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');

app.use(
  cors({
    origin: (origin, callback) => {
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

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/students', studentRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/top10', rankingRoutes);

app.use(notFound);
app.use(errorHandler);

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 G-Scores API running on http://localhost:${PORT}`);
  });
};

bootstrap();

module.exports = app;
