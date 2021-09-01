const inquirer = require("inquirer");
const shell = require("shelljs");

const logger = require("../../utils/logger");

const switchNewBranch = (origin, newBranch) => {
  const command = [
    `git fetch --all >/dev/null 2>&1`,
    `git checkout ${origin} >/dev/null 2>&1`,
    `git reset origin/${origin} --hard >/dev/null 2>&1`,
    `git checkout -b "${newBranch}" >/dev/null 2>&1`,
  ].join(" && ");
  if (shell.exec(command).code !== 0) {
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
      switchNewBranch(origin, newBranch);
    });
};

const register = (program) => {
  program
    .command("branch:create")
    .description("Create a new branch")
    .action(receiver);
};

module.exports.register = register;
