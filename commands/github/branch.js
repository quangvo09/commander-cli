import inquirer from "inquirer";
import shell from "shelljs";

import * as constants from "../../constants/index.js";
import * as logger from "../../utils/logger.js";

const gotoNewBranch = (origin, newBranch) => {
  const command = [
    `git fetch --all`,
    `git checkout ${origin}`,
    `git reset origin/${origin} --hard`,
    `git checkout -b "${newBranch}"`,
  ].join(" && ");
  const result = shell.exec(command, { silent: true });
  if (result.code !== 0) {
    logger.error("Git commit failed");
    return shell.exit(1);
  }
  logger.success("Done! We are on new branch");
};

const receiver = (_options) => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What purpose of new branch?",
        choices: [
          constants.BRANCH_PURPOSE.FEATURE,
          constants.BRANCH_PURPOSE.HOTFIX,
          constants.BRANCH_PURPOSE.RELEASE,
        ],
      },
      {
        type: "input",
        name: "branch",
        message: "Input branch name:",
      },
    ])
    .then((answers) => {
      let origin = "";
      let prefix = "";
      switch (answers.action) {
        case constants.BRANCH_PURPOSE.FEATURE:
          prefix = "feat";
          origin = "develop";
          break;
        case constants.BRANCH_PURPOSE.HOTFIX:
          prefix = "hotfix";
          origin = "master";
          break;
        case constants.BRANCH_PURPOSE.RELEASE:
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

export const register = (program) => {
  program
    .command("br:create")
    .alias("brc")
    .alias("br:c")
    .description("Create a new branch")
    .action(receiver);
};
