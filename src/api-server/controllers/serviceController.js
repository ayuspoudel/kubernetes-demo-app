const { set, get } = require("../../raft-store/raft-store");
const Service = require("../models/service");

async function createService(req, res) {
  const { name } = req.body;
  const service = new Service(name);
  await set(`service:${service.name}`, service);
  res.status(201).json({ message: `Service ${service.name} created`, service });
}

async function getServices(req, res) {
  const services = (await get("services")) || [];
  res.json(services);
}

module.exports = { createService, getServices };
