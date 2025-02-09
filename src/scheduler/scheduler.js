const { get, set } = require("../raft-store/raft-store");

async function schedulePods() {
  let pods = (await get("pods")) || [];
  let nodes = (await get("nodes")) || [];

  pods.sort((a, b) => b.cpu - a.cpu); // Sort pods by CPU usage (decreasing)

  for (let pod of pods) {
    if (!pod.node) {
      let bestNode = nodes
        .filter((n) => n.cpuAvailable >= pod.cpu)
        .sort((a, b) => b.cpuAvailable - a.cpuAvailable)[0];

      if (bestNode) {
        console.log(`Assigning pod ${pod.name} to node ${bestNode.id}`);
        pod.node = bestNode.id;
        bestNode.cpuAvailable -= pod.cpu;
        await set(`pod:${pod.name}`, pod);
        await set(`node:${bestNode.id}`, bestNode);
      }
    }
  }
}

setInterval(schedulePods, 5000);
