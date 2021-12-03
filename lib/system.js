const { spawnSync, execSync } = require('child_process')
const { existsSync } = require('fs')
// Below we need to change func name as parameter is the same name..
const stripTerminalColorFunction = require('@nexssp/extend/array').stripTerminalColors
const { arrArgvAddQuotes } = require('@nexssp/extend/array')

function debugOutput(command, options, stdout, stderr) {
  if (!options.stdio) {
    options.stdio = 'pipe'
  }

  console.log(
    stderr
      ? `\n${'Result WITH STDERR:'}`
      : `\n${'Result WITHOUT STDERR:'}` +
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
  )
  if (stderr) {
    console.error(stderr)
  }
}

function nExec(command, options) {
  options = parseOptions(options)
  const stripTerminalColors = options.stripTerminalColors
  delete options.stripTerminalColors
  let stdout = ''
  let stderr = ''

  try {
    stdout = execSync(command, options)
    stdout = stdout.toString()
    if (stripTerminalColors) {
      stdout = stripTerminalColorFunction(stdout)
    }

    return { exitCode: 0, stdout, stderr: '', command }
  } catch (result) {
    if (result.stdout) stdout = result.stdout.toString()
    if (result.stderr) stderr = result.stderr.toString()

    if (stripTerminalColors) {
      stdout = stripTerminalColorFunction(stdout)
      stderr = stripTerminalColorFunction(stderr)
    }

    if (nExec.debug) {
      debugOutput(command, options, stdout, stderr)
    }

    return {
      exitCode: result.status,
      stdout,
      stderr,
      command,
    }
  }
}

const parseOptions = (opts = {}) => {
  if (!opts.stdio) {
    opts.stdio = 'pipe'
  }
  if (process.platform !== 'win32') {
    Object.assign(opts, { shell: require('@nexssp/os/legacy').getShell() })
  } else {
    Object.assign(opts, { shell: true })
  }

  // if cwd is empty or null - can't be passed
  if (opts.cwd && !existsSync(opts.cwd)) {
    return new Error(`Folder passed to 'nSpawn' does not exist.`)
  }

  return opts
}

function nSpawn(command, options = {}) {
  const { parseArgsStringToArgv } = require('string-argv')
  let parsed = parseArgsStringToArgv(command)
  parsed = arrArgvAddQuotes(parsed)
  // End to check
  const [cmd, ...args] = parsed

  if (nSpawn.debug) {
    console.log('command:', command)
    console.log('cmd:', cmd)
    console.log('args:', args)
  }

  options = parseOptions(options)
  // spawnSync don't see commands without cmd, despite they are ok to run with execSync
  let commandExtension = ''
  // if (process.platform === "win32" && cmd === "nexss") {
  //   commandExtension = ".cmd";
  // }
  const stripTerminalColors = options.stripTerminalColors
  delete options.stripTerminalColors

  let stderr = ''
  let stdout = ''
  let exitCode = 0

  let result

  // options.windowsVerbatimArguments = true;
  try {
    result = spawnSync(`${cmd}${commandExtension}`, args, options)
  } catch (e) {
    console.log('Error catched:', e)
    process.exit(1)
  }

  if (result.error) {
    switch (result.error.code) {
      case 'ENOENT':
        throw new Error(`Program has not been found: ${result.error}, path: ${result.error.path}.`)
        break
      case 'EACCES':
        throw new Error(`Permission denied: ${result.error}, path: ${result.error.path}`)
      default:
        throw new Error(result.error)
    }
  } else {
    if (result.stdout) stdout = result.stdout.toString()
    if (result.stderr) stderr = result.stderr.toString()
    if (result.status) exitCode = result.status

    if (stripTerminalColors) {
      stdout = stripTerminalColorFunction(stdout)
      stderr = stripTerminalColorFunction(stderr)
    }

    if (nSpawn.debug) {
      debugOutput(command, options, stdout, stderr)
    }

    return {
      exitCode,
      stdout,
      stderr,
      cmd,
      args,
      command,
    }
  }
}

nSpawn.debug = false

function nExecTerminal(command, options = {}) {
  const defaultOptions = {
    stdio: 'inherit',
    detached: false,
    shell: require('@nexssp/os/legacy').getShell(),
    cwd: process.cwd(),
    maxBuffer: 1024 * 1024 * 100,
  }

  const finalOptions = Object.assign({}, defaultOptions, options)

  try {
    require('child_process').execSync(command, finalOptions)
  } catch (error) {
    console.log(`Command failed ${command}`)
  }
}

module.exports = { nSpawn, nExec, nExecTerminal, getShell: require('@nexssp/os/legacy').getShell }
