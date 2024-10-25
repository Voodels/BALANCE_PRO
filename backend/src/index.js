const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Database connection test
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/reports", async (req, res) => {
  try {
    const [testParameters, testResults] = await Promise.all([
      prisma.testParameters.findMany(),
      prisma.testResults.findMany()
    ]);
    res.json({ testParameters, testResults });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

app.get("/api/test-data", async (req, res) => {
  try {
    const [parameters, results] = await Promise.all([
      prisma.testParameters.findMany(),
      prisma.testResults.findMany()
    ]);
    res.json({ parameters, results });
  } catch (error) {
    console.error("Error fetching test data:", error);
    res.status(500).json({ error: "Failed to fetch test data" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
async function startServer() {
  await testDbConnection();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  prisma.$disconnect();
  process.exit(0);
});