const { get, set } = require("../raft-store/raft-store");

async function registerDNS() {
  console.log("Registering DNS entries for services");

  let services = (await get("services")) || [];

  for (let service of services) {
    let pods = (await get("pods")) || [];
    let assignedPods = pods.filter((pod) => pod.service === service.name);

    if (assignedPods.length > 0) {
      service.dnsEntry = `${service.name}.cluster.local -> ${assignedPods
        .map((pod) => pod.ip)
        .join(", ")}`;
      await set(`service:${service.name}`, service);
      console.log(`Registered DNS entry: ${service.dnsEntry}`);
    }
  }
}

setInterval(registerDNS, 5000);

console.log("DNS Service started");
