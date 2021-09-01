#!/usr/bin/env node

const commander = require("commander");
const githubCommand = require("./commands/github");

const program = new commander.Command();
githubCommand.register(program);

program.parse(process.argv);
