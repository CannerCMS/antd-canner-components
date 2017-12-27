export default class imageService {
  constructor(config) {
    const { dir, filename } = config;
    this.dir = dir;
    this.filename = filename;
  }
  getServiceConfig() {
    return {};
  }
}
