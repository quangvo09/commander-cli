import shell from "shelljs";
import chalk from "chalk";

import * as constants from "../../constants/index.js";
import * as logger from "../../utils/logger.js";
import * as question from "../../utils/question.js";
import * as config from "../../utils/config.js";
import * as progress from "../../utils/progress.js";

const createPR = (baseBranch, title, options) => {
  const command = `gh pr create`;
  const opts = [`--base "${baseBranch}"`, `--title "${title}"`];

  opts.push(`--body "${options.body || "New PR"}"`);

  if (options.assignee) {
    opts.push(`--assignee "${options.assignee}"`);
  }

  if (options.reviewer) {
    opts.push(`--reviewer "${options.reviewer}"`);
  }

  if (options.label) {
    opts.push(`--label "${options.label}"`);
  }

  // console.debug(`${command} ${opts.join(" ")}`);

  const result = shell.exec(`${command} ${opts.join(" ")}`, { silent: true });
  if (result.code !== 0) {
    logger.error(`\nCreate PR to \`${baseBranch}\` failed`, result.stderr);
    return shell.exit(1);
  }

  return result.stdout.replace(/\n/g, "");
};

const getAllBranches = () => {
  const result = shell.exec(
    "git for-each-ref --format='%(refname:short)' refs/heads/",
    {
      silent: true,
    }
  );
  if (result.code !== 0) {
    logger.error("Git commit failed", result.stderr);
    return shell.exit(1);
  }

  const branches = result.stdout.trim().split("\n");
  return branches;
};

const getCurrentBranch = () => {
  const result = shell.exec("git branch --show-current", { silent: true });
  if (result.code !== 0) {
    logger.error("Git commit failed", result.stderr);
    return shell.exit(1);
  }

  const branchName = result.stdout.trim();
  logger.notice("Current branch name:", branchName);

  let purpose = "";
  switch (true) {
    case branchName.match(/^feat\//)?.input:
      purpose = constants.BRANCH_PURPOSE.FEATURE;
      break;
    case branchName.match(/^hotfix\//)?.input:
      purpose = constants.BRANCH_PURPOSE.HOTFIX;
      break;
    case branchName.match(/^release\//)?.input:
      purpose = constants.BRANCH_PURPOSE.RELEASE;
      break;

    default:
      purpose = constants.BRANCH_PURPOSE.FEATURE;
  }

  if (!purpose) {
    logger.error("Don't know branch purpose:", branchName);
    return shell.exit(1);
  }

  return {
    name: branchName,
    purpose: purpose,
  };
};

const getClickupTask = async (branchName) => {
  const isLink = await question.confirm("Do you want to link to clickup task");
  if (!isLink) {
    return null;
  }

  let taskId = null;
  const pattern = /cu-([\w\d]+)/i;
  const matches = branchName.match(pattern);
  if (matches && matches.length > 2) {
    taskId = matches[1];
  }

  taskId = await question.input("Input clickup task id", {
    default: taskId,
  });

  if (!taskId) {
    logger.warn("Skip to link to clickup task");
  }

  return taskId;
};

const createFeatureFlow = async (branch) => {
  const conf = config.get("pull_request.feature");
  const task = await getClickupTask(branch.name);
  const feature = await question.input("Input feature name");
  if (!feature) {
    logger.error("Please input feature name");
    return shell.exit(1);
  }

  const prefix = task ? `CU-${task}[dev ready] ` : "";
  const title = `${prefix}${feature}`;
  logger.notice("We will create PR name", title);

  shell.exec(`echo '${conf.template}' > PR.md`, {
    silent: true,
  });
  shell.exec("code . -r PR.md", { silent: true });
  await question.input(
    "You can make adjustments to PR.md. Then press enter to continue."
  );
  const { stdout: body } = shell.exec("cat PR.md", { silent: true });
  shell.exec("rm .temp_pr.md", { silent: true });

  const branches = getAllBranches();
  const defaultBaseBranches = conf.base_branches || [];
  const baseBranches = branches.filter(
    (b) => defaultBaseBranches.includes(b) && b !== branch.name
  );
  const selected = await question.checkbox(
    "Select branch you want to create PR to",
    baseBranches.map((b) => ({
      name: b,
      checked: true,
    }))
  );

  const assignees = conf.assignees || [];
  const reviewers = conf.reviewers || [];

  const bar = progress.bar(chalk.cyan("❯ Create PR: "), 0.2, 2);
  const prs = selected.map((branch, index) => {
    const labels = conf.labels || [branch];
    const pr = createPR(branch, title, {
      body: body,
      assignee: assignees.join(","),
      reviewer: reviewers.join(","),
      label: labels.join(","),
    });

    bar.update(index + 1);

    return {
      branch,
      pr,
    };
  });
  bar.stop();

  logger.success("Success:", title);
  prs.map(({ branch, pr }) => {
    logger.success(`[${branch}]:`, pr);
  });
};

const createReleaseFlow = (branch) => {};
const createHotfixFlow = (branch) => {};

const receiver = (_options) => {
  const branch = getCurrentBranch();
  logger.notice("Create PR for purpose:", branch.purpose);
  switch (branch.purpose) {
    case constants.BRANCH_PURPOSE.FEATURE:
      createFeatureFlow(branch);
      break;
    case constants.BRANCH_PURPOSE.RELEASE:
      createReleaseFlow(branch);
      break;
    case constants.BRANCH_PURPOSE.HOTFIX:
      createHotfixFlow(branch);
      break;
  }
};

export const register = (program) => {
  program
    .command("pr:create")
    .alias("prc")
    .alias("pr:c")
    .description("Create a new pull-request")
    .action(receiver);
};
