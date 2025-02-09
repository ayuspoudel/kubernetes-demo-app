const { get, set } = require("../raft-store/raft-store");

const CIDR_BASE = "10.0.0.";
let lastAssignedIp = 2;

async function assignIPs() {
  console.log("Assigning IPs to pods");

  let pods = (await get("pods")) || [];

  for (let pod of pods) {
    if (!pod.ip) {
      pod.ip = CIDR_BASE + lastAssignedIp++;
      await set(`pod:${pod.name}`, pod);
      console.log(`Assigned IP ${pod.ip} to pod ${pod.name}`);
    }
  }
}

setInterval(assignIPs, 5000);

console.log("IP Assigner started");
