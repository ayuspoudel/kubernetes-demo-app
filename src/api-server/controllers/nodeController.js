const { set, get } = require("../../raft-store/raft-store");
const Node = require("../models/node");

async function registerNode(req, res) {
  const { id, ip, cpuTotal, memoryTotal } = req.body;
  const node = new Node(id, ip, cpuTotal, memoryTotal);
  await set(`node:${node.id}`, node);
  res.status(201).json({ message: `Node ${node.id} registered`, node });
}

async function getNodes(req, res) {
  const nodes = (await get("nodes")) || [];
  res.json(nodes);
}

module.exports = { registerNode, getNodes };
