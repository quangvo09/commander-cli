const inquirer = require("inquirer");
const shell = require("shelljs");

const logger = require("../../utils/logger");

const gotoNewBranch = (origin, newBranch) => {
  const command = [
    `git fetch --all`,
    `git checkout ${origin}`,
    `git reset origin/${origin} --hard`,
    `git checkout -b "${newBranch}"`,
  ].join(" && ");
  if (shell.exec(command, { silent: true }).code !== 0) {
    logger.error("Git commit failed");
    return shell.exit(1);
  }

  logger.success("Now we are on new branch:", newBranch);
};

const receiver = (_options) => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What purpose of new branch?",
        choices: ["Feature", "Hotfix", "Release"],
      },
      {
        type: "input",
        name: "branch",
        message: "Input the branch name:",
      },
    ])
    .then((answers) => {
      let origin = "";
      let prefix = "";
      switch (answers.action) {
        case "Feature":
          prefix = "feat";
          origin = "develop";
          break;
        case "Hotfix":
          prefix = "hotfix";
          origin = "master";
          break;
        case "Release":
          prefix = "release";
          origin = "develop";
          break;
      }

      const branch = answers.branch.toLocaleLowerCase().replace(/\s+/g, "-");
      const newBranch = `${prefix}/${branch}`;
      logger.notice("Switch to new branch", newBranch);
      gotoNewBranch(origin, newBranch);
    });
};

const register = (program) => {
  program
    .command("branch:create")
    .description("Create a new branch")
    .action(receiver);
};

module.exports.register = register;
