const Raft = require("raft");
const fs = require("fs");

const raft = new Raft({
  id: process.env.NODE_ID || "node1",
  directory: `./raft-${process.env.NODE_ID}`,
  peers: ["node1", "node2", "node3"],
});

let store = {};

raft.on("commit", (command) => {
  if (command.type === "set") {
    store[command.key] = command.value;
  }
});

async function set(key, value) {
  await raft.command({ type: "set", key, value });
}

async function get(key) {
  return store[key] || null;
}

async function del(key) {
  delete store[key];
}

module.exports = { set, get, del };
