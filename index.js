#!/usr/bin/env node
import commander from "commander";
import chalk from "chalk";
import figlet from "figlet";

import { createRequire } from "module";
import * as githubCommand from "./commands/github/index.js";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

console.log(
  chalk.yellow(
    figlet.textSync("CMD CLI", {
      font: "Graffiti",
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true,
    })
  )
);
console.log("");

const program = new commander.Command();
program.version(pkg.version);
githubCommand.register(program);
program.parse(process.argv);
