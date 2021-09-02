import chalk from "chalk";

export const notice = (message, value = "") => {
  console.log(chalk.cyan("❯ %s ") + chalk.white("%s"), message, value);
};

export const warn = (message, value = "") => {
  console.log(chalk.yellow("! %s ") + chalk.white("%s"), message, value);
};

export const error = (message, value = "") => {
  console.log(chalk.red("ERROR: %s ") + chalk.white("%s"), message, value);
};

export const success = (message, value = "") => {
  console.log(chalk.green("➜ %s ") + chalk.white("%s"), message, value);
};
