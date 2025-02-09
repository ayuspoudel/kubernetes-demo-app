class Pod {
  constructor(name, image, cpu, memory, service = null) {
    this.name = name; // Unique pod name
    this.image = image; // Docker image name
    this.cpu = cpu; // Requested CPU
    this.memory = memory; // Requested memory (MB)
    this.node = null; // Assigned Node ID (set by Scheduler)
    this.ip = null; // Assigned IP Address (set by IP Assigner)
    this.service = service; // Service Name (for DNS resolution)
    this.running = false; // Running status (updated by Controller Manager)
    this.terminate = false; // Termination flag (for cleanup)
  }
}

module.exports = Pod;
