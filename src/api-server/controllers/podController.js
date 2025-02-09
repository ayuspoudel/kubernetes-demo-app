const { set, get, del } = require("../../raft-store/raft-store");

async function createPod(req, res) {
  const pod = req.body;
  await set(`pod:${pod.name}`, pod);
  res.status(201).json({ message: `Pod ${pod.name} created`, pod });
}

async function getPods(req, res) {
  const pods = (await get("pods")) || [];
  res.json(pods);
}

async function deletePod(req, res) {
  const podId = req.params.id;
  await del(`pod:${podId}`);
  res.json({ message: `Pod ${podId} deleted` });
}

module.exports = { createPod, getPods, deletePod };
