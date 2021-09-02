import inquirer from "inquirer";

export const confirm = async (message, ...props) => {
  const question = {
    type: "confirm",
    name: "value",
    message: `${message}:`,
    ...props,
  };
  const answer = await inquirer.prompt([question]);
  return answer.value;
};

export const input = async (message, ...props) => {
  const question = {
    type: "input",
    name: "value",
    message: `${message}:`,
    ...props,
  };
  const answer = await inquirer.prompt([question]);
  return answer.value;
};

export const checkbox = async (message, choices, ...props) => {
  const question = {
    type: "checkbox",
    name: "value",
    message: `${message}:`,
    choices: choices,
    ...props,
  };
  const answer = await inquirer.prompt([question]);
  return answer.value;
};
