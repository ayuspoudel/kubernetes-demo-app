const Docker = require("dockerode");
const docker = new Docker();

async function startContainer(image, name) {
  let container = await docker.createContainer({
    Image: image,
    Cmd: ["/bin/sh", "-c", "while true; do sleep 3600; done"],
    name: `mini-k8s-${name}`,
  });
  await container.start();
  console.log(`Started container for ${name}`);
}

async function stopContainer(name) {
  let container = await docker.getContainer(`mini-k8s-${name}`);
  if (container) {
    await container.stop();
    await container.remove();
    console.log(`Stopped and removed container for ${name}`);
  }
}

async function getRunningContainers() {
  let containers = await docker.listContainers({ all: true });
  return containers.map((container) =>
    container.Names[0].replace("/mini-k8s-", "")
  );
}

module.exports = { startContainer, stopContainer, getRunningContainers };
