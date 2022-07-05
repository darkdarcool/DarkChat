import terminal from "./services/terminal.js";
import inquirer from "inquirer";
import { auth, createUser } from "./services/firebase.js"
import chalk from "chalk"
import spinner from "nanospinner"

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

/**
 * 
 * @returns {import("firebase/auth").User}
 */
export default async function signup() {
  terminal.clear(); // Just incase!
  let { Email: email } = await inquirer.prompt({
    name: "Email"
  });
  let { Username: username } = await inquirer.prompt({
    name: "Username"
  });
  let { Password: password } = await inquirer.prompt({
    mask: "*",
    name: "Password",
    type: "password"
  });
  let { "Confirm Password": confirmPassword } = await inquirer.prompt({
    mask: "*",
    name: "Confirm Password",
    type: "password"
  });
  terminal.clear();


  await checkUserData(email, username, password, confirmPassword);
  let uData;
  let spin;
  try {
    spin = spinner.createSpinner("Creating account").start();
    uData = await createUser(email, username, password);
  } catch(err) {
    spin.error({ text: err.message }); // Too lazy to parse this lmao. Do this later with err.code
    await sleep();
    terminal.clear();
    await signup();
  }
  spin.success(chalk.green.bold("Account created!"));
  await sleep();
  terminal.clear();
  return uData;
}

async function checkUserData(email, username, password, confirmPassword) {
  if (confirmPassword != password) {
    console.log(chalk.red.bold("Passwords do not match"));
    await sleep();
    terminal.clear();
    await signup(); // Restart
  }
  if (username.length > 30) {
    console.log(chalk.red.bold("Username is too long"));
    await sleep();
    terminal.clear();
    await signup();
  }
}

