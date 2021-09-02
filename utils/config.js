import Store from "configstore";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pkg = require("../package.json");
const config = new Store(pkg.name);

export const get = (key) => {
  return config.get(key);
};

export const set = (key, value) => {
  return config.set(key, value);
};
