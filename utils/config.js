import Store from "configstore";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pkg = require("../package.json");
const filePath = path.join(path.dirname(""), ".cmdrc");
const config = new Store(
  pkg.name,
  {
    pull_request: {
      feature: {
        base_branches: ["develop", "integration"],
        assignees: ["me"],
        reviewers: ["me"],
      },
      release: {
        base_branches: ["master", "develop", "integration"],
        assignees: ["me"],
        reviewers: ["me"],
        labels: ["release"],
      },
      hotfix: {
        base_branches: ["master", "develop", "integration"],
        assignees: ["me"],
        reviewers: ["me"],
        labels: ["hotfix"],
      },
    },
  },
  { configPath: filePath }
);

export const get = (key) => {
  return config.get(key);
};

export const set = (key, value) => {
  return config.set(key, value);
};
