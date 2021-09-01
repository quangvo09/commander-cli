const branchCommand = require("./branch");

const commands = [branchCommand];
const register = (program) => {
  commands.forEach((cmd) => cmd.register(program));
};

module.exports.register = register;
