const express = require("express");
const podRoutes = require("./routes/pods");
const nodeRoutes = require("./routes/nodes");
const serviceRoutes = require("./routes/services");

const app = express();
app.use(express.json());

// Mount API routes
app.use("/pods", podRoutes);
app.use("/nodes", nodeRoutes);
app.use("/services", serviceRoutes);

// Start API Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`API Server running on port ${PORT}`)
);

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("Shutting down API server...");
  server.close(() => {
    console.log("API Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Received termination signal, shutting down...");
  server.close(() => {
    console.log("API Server closed");
    process.exit(0);
  });
});
