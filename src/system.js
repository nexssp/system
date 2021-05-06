"use strict";
const { spawnSync } = require("child_process");
const { existsSync } = require("fs");
require("@nexssp/extend")("array");

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
  const { parseArgsStringToArgv } = require("string-argv");
  const parsed = parseArgsStringToArgv(command);
  // const strippedQuotesArgs = parsed.argStripQuotes();
  const [cmd, ...args] = parseArgsStringToArgv(command);

  if (nSpawn.debug) {
    console.log("command:", command);
    console.log("cmd:", cmd);
    console.log("args:", args);
  }

  Object.assign(options, {
    shell: process.platform == "win32" ? true : process.shell,
  });

  // if cwd is empty or null - can't be passed
  if (options.cwd && !existsSync(options.cwd)) {
    return new Error(`Folder passed to 'nSpawn' does not exist.`);
  }

  // spawnSync don't see commands without cmd, despite they are ok to run with execSync
  let commandExtension = "";
  // if (process.platform === "win32" && cmd === "nexss") {
  //   commandExtension = ".cmd";
  // }

  let stderr = "";
  let stdout = "";
  let exitCode = 0;
  options.stdio = "pipe";
  let result;
  try {
    result = spawnSync(`${cmd}${commandExtension}`, args, options);
  } catch (e) {
    console.log("Error catched:", e);
    process.exit(1);
  }
  if (result.error) {
    switch (result.error.code) {
      case "ENOENT":
        throw new Error(
          `Program has not been found: ${result.error}, path: ${result.error.path}`
        );
        break;
      case "EACCES":
        throw new Error(
          `Permission denied: ${result.error}, path: ${result.error.path}`
        );
      default:
        throw new Error(result.error);
    }
  } else {
    stdout = result.stdout.toString();
    stderr = result.stderr.toString();
    exitCode = result.status;

    if (nSpawn.debug) {
      debugOutput(command, options, stdout, stderr);
    }

    return {
      exitCode,
      stdout,
      stderr,
    };
  }
}

nSpawn.debug = false;

module.exports = { nSpawn };
