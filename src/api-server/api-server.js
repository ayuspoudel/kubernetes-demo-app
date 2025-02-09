const express = require("express");
const podRoutes = require("./routes/pods");
const nodeRoutes = require("./routes/nodes");
const serviceRoutes = require("./routes/services");

const app = express();
app.use(express.json());

// Routes
app.use("/pods", podRoutes);
app.use("/nodes", nodeRoutes);
app.use("/services", serviceRoutes);

// Start API server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Server running on port ${PORT}`));
