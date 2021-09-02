import Store from "configstore";
import path from "path";
import * as fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require.extensions[".md"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const pkg = require("../package.json");
const featureTemplate = require("../materials/pr_feature_template.md");
const filePath = path.join(path.dirname(""), ".cmdrc");

const config = new Store(
  pkg.name,
  {
    pull_request: {
      feature: {
        base_branches: ["develop", "integration"],
        assignees: ["me"],
        reviewers: ["me"],
        template: featureTemplate,
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
