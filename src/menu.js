import inquirer from "inquirer";
import chalk from "chalk"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"
import terminal from "./services/terminal.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


async function genMenu() {
  const prompt = await inquirer.prompt({
    name: "Menu Selection",
    type: "list",
    choices: [
      "Login",
      "Sign up",
      "Exit"
    ]
  });
  return prompt;
}

function genName() {
  return figlet.textSync("DarkChat");
}

async function welcomeText() {
  const rainbow = chalkAnimation.rainbow(genName());
  await sleep();
  rainbow.stop();
}

async function welcome() {
  terminal.clear();
  await welcomeText();
  let answer;
  answer = await genMenu();
  return answer;
}

export default async function menu() {
  let data = await welcome();
  terminal.clear();
  return data["Menu Selection"];
}