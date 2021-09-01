const chalk = require("chalk");

module.exports = {
  notice: (message, value) => {
    console.log(chalk.cyan("❯ %s: ") + chalk.white("%s"), message, value);
  },
  warn: (message) => {
    console.log(chalk.yellow("! %s"), message);
  },
  error: (message) => {
    console.log(chalk.red("ERROR: %s"), message);
  },
  success: (message, value = "") => {
    console.log(chalk.green("➜ %s ") + chalk.white("%s"), message, value);
  },
};
