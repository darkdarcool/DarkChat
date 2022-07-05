import terminal from "./services/terminal.js";
import inquirer from "inquirer";
import { signIn} from "./services/firebase.js"
import chalk from "chalk"
import spinner from "nanospinner"
// import { User } from "firebase/auth"

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


/**
 * 
 * @returns {import("firebase/auth").User}
 */
export default async function login() {
  let { Email: email } = await inquirer.prompt({
    name: "Email"
  });
  let { Password: password } = await inquirer.prompt({
    mask: "*",
    name: "Password",
    type: "password"
  });

  let user;
  let spin;

  try {
    spin = spinner.createSpinner("Signing in...").start();
  
    user = await signIn(email, password)
    
    await sleep();
  } catch(err) {
    // console.log(err);
    spin.error({ text: chalk.red.bold(err.message) });
    await sleep();
    // terminal.clear();
    await login();
  }
  spin.success({ text: "Success!" });
  return user.user;

}