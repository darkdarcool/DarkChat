import login from "./login.js";
import menu from "./menu.js"
import terminal from "./services/terminal.js";
import signup from "./signup.js"
import app from "./app/index.js"
let selection = await menu();

let user;

if (selection == "Exit") {
  terminal.clear();
  process.exit(0);
} else if (selection == "Sign up") {
  user = await signup();
} else if (selection == "Login") {
  user = await login();
}

await app(user);