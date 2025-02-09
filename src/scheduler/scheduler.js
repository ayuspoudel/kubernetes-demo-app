const { get, set } = require("../raft-store/raft-store");
const algorithms = require("./algorithms");

const SCHEDULING_ALGORITHM = "binPacking"; // Change to "firstFit", "bestFit", etc.

async function schedulePods() {
  console.log("Running scheduler");

  let pods = (await get("pods")) || [];
  let nodes = (await get("nodes")) || [];

  if (nodes.length === 0) {
    console.log("No nodes available for scheduling");
    return;
  }

  if (pods.length === 0) {
    console.log("No pending pods to schedule");
    return;
  }

  if (algorithms[SCHEDULING_ALGORITHM]) {
    algorithms[SCHEDULING_ALGORITHM](pods, nodes);
  } else {
    console.log(`Invalid scheduling algorithm: ${SCHEDULING_ALGORITHM}`);
    return;
  }

  for (let pod of pods) {
    if (pod.node) {
      await set(`pod:${pod.name}`, pod);
      console.log(`Scheduled pod ${pod.name} to node ${pod.node}`);
    }
  }

  for (let node of nodes) {
    await set(`node:${node.id}`, node);
  }
}

setInterval(schedulePods, 5000);

console.log("Scheduler started");
