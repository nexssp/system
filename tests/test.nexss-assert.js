const assert = require('assert').strict
process.chdir(__dirname)
const { nExec, nSpawn, nExecTerminal } = require('../lib/system')

// const commandArgs = `php -r "echo 'xxx';"`;
const commandArgs = `nexss Output/End "works on Ubuntu" --platform:check="UBUNTU" --platform:noerror --nxsPipeErrors`

// const commandArgs = `echo {"array":["x","y","z"]} | nexss Id --nxsSelect=array`;

// const resultCA = nExec(commandArgs)

// const command0 = `nexss js run "console.log('xxxx')"`;
// const result0 = nSpawn(command0);
// assert.match(result0.stdout.toString(), /xxxx\n/);
// console.log('!!!!!', resultCA)
// process.exit(1)
const command1 = `echo Id --myPath=CDE --myPath="Program Files" --nxsConcat="myPath" --nxsGlue=PATH --debug`
const result1 = nSpawn(command1)
assert.match(
  result1.stdout.toString(),
  /Id --myPath="CDE" --myPath="Program Files" --nxsConcat="myPath" --nxsGlue="PATH" --debug/
)

const command2 = `node stderr_stdout_1.js`
const result2 = nSpawn(command2)

assert.equal(result2.stdout.toString(), 'stdout1\n')
assert.ok(result2.stderr.toString(), 'stderr1\n')
assert.equal(result2.exitCode, 1)

const command3 = `node stderr_stdout_exit_2.js`
const result3 = nSpawn(command3)
assert.equal(result3.stdout.toString(), 'stdout2\n')
assert.ok(result3.stderr.toString(), 'stderr2\n')
assert.equal(result3.exitCode, 1)

const command4 = `node stderr_stdout_exit_2.js`
const result4 = nExecTerminal(command4)

// const command3 = `nexss Nexss/Test/Platform/example1.nexss`;
// const result3 = nSpawn(command3);
// assert.equal(result3.stdout.toString(), "stdout2\n");
// assert.ok(result3.stderr.toString(), "stderr2\n");
// assert.equal(result3.exitCode, 1);

// const command4 = `nexss Nexss/Test/Platform/example1.nexss`;
// const result4 = nSpawn(command4);
// assert.equal(result4.stdout.toString(), "stdout2\n");
// assert.ok(result4.stderr.toString(), "stderr2\n");
// assert.equal(result4.exitCode, 1);
