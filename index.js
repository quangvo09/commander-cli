#!/usr/bin/env node

const commander = require("commander");
const githubCommand = require("./commands/github");
const package = require("./package.json");

const program = new commander.Command();
program.version(package.version);

githubCommand.register(program);

program.parse(process.argv);
