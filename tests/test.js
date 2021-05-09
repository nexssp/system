const assert = require("assert").strict;
const { nSpawn } = require("../");

// const command = `nexss Id --var1=myval1 --var1=myval2 --var1=myval3 --var1=myval4 --nxsDelete=cuid,Select_2 --nxsSelect="var1"`;

// nSpawn.debug = true;

const commandZ = `nexss Output/End "works on Ubuntu" --platform:check="UBUNTU" --platform:noerror`;
const resultZ = nSpawn(commandZ, { stripTerminalColors: true });
assert.match(
  resultZ.stdout.toString() + resultZ.stderr.toString(),
  /WARN WARN:  Nexss Programmer: UBUNTU did not match with your platform win32, WINDOWS10 or WINDOWS. But program WILL continue/i
);

const commandA = `echo '{"array":["x","y","z"]}' | nexss Id --nxsSelect=array`;
const resultA = nSpawn(commandA);
assert.match(
  resultA.stdout.toString(),
  /"Select":"x","Select_2":"y","Select_3":"z"/
);

// process.exit(1);

const command0 = `node process_argv.js --myPath=CDE --myPath="Program Files" --nxsConcat="myPath" --nxsGlue=PATH --debug`;
const result0 = nSpawn(command0);

assert.match(result0.stdout.toString(), /--myPath=Program Files/);

process.exit(1);

const command1 = `echo Id --myPath=CDE --myPath="Program Files" --nxsConcat="myPath" --nxsGlue=PATH --debug`;
const result1 = nSpawn(command1);
assert.match(
  result1.stdout.toString(),
  /Id --myPath=CDE --myPath="Program Files" --nxsConcat="myPath" --nxsGlue=PATH --debug\r\n/
);

const command2 = `node stderr_stdout_1.js`;
const result2 = nSpawn(command2);
assert.equal(result2.stdout.toString(), "stdout1\n");
assert.ok(result2.stderr.toString(), "stderr1\n");
assert.equal(result2.exitCode, 1);

const command3 = `node stderr_stdout_exit_2.js`;
const result3 = nSpawn(command3);
assert.equal(result3.stdout.toString(), "stdout2\n");
assert.ok(result3.stderr.toString(), "stderr2\n");
assert.equal(result3.exitCode, 1);

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
