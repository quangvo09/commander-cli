import * as branchCommand from "./branch.js";
import * as pullRequestCommand from "./pull-request.js";

const commands = [branchCommand, pullRequestCommand];
export const register = (program) => {
  commands.forEach((cmd) => cmd.register(program));
};
