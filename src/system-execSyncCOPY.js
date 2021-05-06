const { execSync } = require("child_process");
const { existsSync } = require("fs");

const defaultOptions = {};
if (process.platform !== "win32") {
  Object.assign(defaultOptions, { shell: process.shell });
}

function debugOutput(command, options, stdout, stderr) {
  console.log(
    stderr
      ? `\n${"Result WITH STDERR:"}`
      : `\n${"Result WITHOUT STDERR:"}` +
          `
Executed: ${command}
Options: `,
    options,
    `process.cwd(): ${process.cwd()}`,
    `
STDOUT:
`,
    stdout,
    `|END STDOUT`
  );
  if (stderr) {
    console.error(stderr);
  }
}

function nSpawn(command, options = {}) {
  var { parseArgsStringToArgv } = require("string-argv");
  const [cmd, ...args] = parseArgsStringToArgv(command);
  if (nSpawn.debug) {
    console.log("command:", command);
    console.log("cmd:", cmd);
    console.log("args:", args);
  }

  if (process.platform !== "win32") {
    Object.assign(options, { shell: process.shell });
  }

  // if cwd is empty or null - can't be passed
  if (options.cwd && !existsSync(options.cwd)) {
    return new Error(`Folder passed to 'nSpawn' does not exist.`);
  }

  let result;

  // spawnSync don't see commands without cmd, despite they are ok to run with execSync
  let commandExtension = "";
  if (process.platform === "win32" && cmd === "nexss") {
    commandExtension = ".cmd";
  }

  let stderr = "";
  let stdout = "";
  let exitCode = 0;
  options.stdio = "pipe";
  try {
    stdout = execSync(`${command} --nxsPipeErrors`, options).toString();
  } catch (er) {
    // stdout = er.stdout.toString();
    stderr = er.stderr.toString();
    console.log(stderr);
    exitCode = er.status;
  }

  if (nSpawn.debug) {
    debugOutput(command, options, stdout, stderr);
  }

  return {
    exitCode,
    stdout,
    stderr,
  };

  if (command === "nexss file add myfile1.js -f -t=helloWorld") {
    console.log("---->", r);
    process.exit(1);
  }

  return r;
}

nSpawn.debug = true;

module.exports = { nSpawn };
