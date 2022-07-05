class Terminal {
  clear() {
    console.clear();
  }
  exit() {
    process.exit(0);
  }
}

export default new Terminal();