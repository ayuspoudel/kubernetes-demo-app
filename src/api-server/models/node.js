class Node {
  constructor(id, ip, cpuTotal, memoryTotal) {
    this.id = id; // Unique Node ID
    this.ip = ip; // Node IP Address
    this.cpuTotal = cpuTotal; // Total CPU Capacity
    this.memoryTotal = memoryTotal; // Total Memory Capacity (MB)
    this.cpuAvailable = cpuTotal; // Available CPU
    this.memoryAvailable = memoryTotal; // Available Memory
    this.healthy = true; // Health status (checked by Controller Manager)
  }
}

module.exports = Node;
