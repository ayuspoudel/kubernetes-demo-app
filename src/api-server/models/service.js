class Service {
  constructor(name) {
    this.name = name; // Service Name
    this.dnsEntry = null; // DNS Entry (set by DNS Service)
  }
}

module.exports = Service;
