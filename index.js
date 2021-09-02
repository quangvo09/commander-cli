#!/usr/bin/env node
import commander from "commander";
import { createRequire } from "module";
import * as githubCommand from "./commands/github/index.js";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const program = new commander.Command();
program.version(pkg.version);
githubCommand.register(program);
program.parse(process.argv);
