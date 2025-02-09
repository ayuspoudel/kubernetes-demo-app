const { get, set, del } = require("../raft-store/raft-store");
const {
  startContainer,
  stopContainer,
  getRunningContainers,
} = require("../worker/worker");
const axios = require("axios");

async function reconcilePods() {
  console.log("Reconciling Pods...");

  let pods = (await get("pods")) || [];
  let runningContainers = await getRunningContainers();

  for (let pod of pods) {
    if (pod.node) {
      let isRunning = runningContainers.includes(pod.name);

      // Restart crashed pods
      if (!isRunning) {
        console.log(`Pod ${pod.name} is down. Restarting...`);
        await startContainer(pod.image, pod.name);
        pod.running = true;
        await set(`pod:${pod.name}`, pod);
      }
    }
  }
}

async function reconcileNodes() {
  console.log("Checking Node Health...");

  let nodes = (await get("nodes")) || [];

  for (let node of nodes) {
    try {
      await axios.get(`http://${node.ip}:3000/health`);
      node.healthy = true;
    } catch (err) {
      console.log(`Node ${node.id} is down.`);
      node.healthy = false;
    }
    await set(`node:${node.id}`, node);
  }
}

async function cleanupPods() {
  console.log("Cleaning Up Terminated Pods...");

  let pods = (await get("pods")) || [];

  for (let pod of pods) {
    if (pod.terminate) {
      console.log(`Removing Pod ${pod.name}`);
      await stopContainer(pod.name);
      await del(`pod:${pod.name}`);
    }
  }
}

// Run reconciliation every 10 seconds
setInterval(() => {
  reconcilePods();
  reconcileNodes();
  cleanupPods();
}, 10000);

console.log("Controller Manager started...");
