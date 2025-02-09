function firstFit(pods, nodes) {
  for (let pod of pods) {
    if (!pod.node) {
      let node = nodes.find(
        (n) => n.cpuAvailable >= pod.cpu && n.memoryAvailable >= pod.memory
      );
      if (node) {
        pod.node = node.id;
        node.cpuAvailable -= pod.cpu;
        node.memoryAvailable -= pod.memory;
      }
    }
  }
}

function bestFit(pods, nodes) {
  for (let pod of pods) {
    if (!pod.node) {
      let sortedNodes = nodes
        .filter(
          (n) => n.cpuAvailable >= pod.cpu && n.memoryAvailable >= pod.memory
        )
        .sort((a, b) => a.cpuAvailable - pod.cpu - (b.cpuAvailable - pod.cpu));

      let bestNode = sortedNodes[0];
      if (bestNode) {
        pod.node = bestNode.id;
        bestNode.cpuAvailable -= pod.cpu;
        bestNode.memoryAvailable -= pod.memory;
      }
    }
  }
}

function worstFit(pods, nodes) {
  for (let pod of pods) {
    if (!pod.node) {
      let sortedNodes = nodes
        .filter(
          (n) => n.cpuAvailable >= pod.cpu && n.memoryAvailable >= pod.memory
        )
        .sort((a, b) => b.cpuAvailable - pod.cpu - (a.cpuAvailable - pod.cpu));

      let worstNode = sortedNodes[0];
      if (worstNode) {
        pod.node = worstNode.id;
        worstNode.cpuAvailable -= pod.cpu;
        worstNode.memoryAvailable -= pod.memory;
      }
    }
  }
}

let roundRobinIndex = 0;

function roundRobin(pods, nodes) {
  for (let pod of pods) {
    if (!pod.node) {
      let node = nodes[roundRobinIndex % nodes.length];

      if (node.cpuAvailable >= pod.cpu && node.memoryAvailable >= pod.memory) {
        pod.node = node.id;
        node.cpuAvailable -= pod.cpu;
        node.memoryAvailable -= pod.memory;
        roundRobinIndex++;
      }
    }
  }
}

function binPacking(pods, nodes) {
  pods.sort((a, b) => b.cpu + b.memory - (a.cpu + a.memory));

  for (let pod of pods) {
    if (!pod.node) {
      let sortedNodes = nodes
        .filter(
          (n) => n.cpuAvailable >= pod.cpu && n.memoryAvailable >= pod.memory
        )
        .sort(
          (a, b) =>
            a.cpuAvailable +
            a.memoryAvailable -
            (b.cpuAvailable + b.memoryAvailable)
        );

      let bestNode = sortedNodes[0];
      if (bestNode) {
        pod.node = bestNode.id;
        bestNode.cpuAvailable -= pod.cpu;
        bestNode.memoryAvailable -= pod.memory;
      }
    }
  }
}

module.exports = {
  firstFit,
  bestFit,
  worstFit,
  roundRobin,
  binPacking,
};
