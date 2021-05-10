# @nexssp/system

- **1.0.8** - new function `nExec`. Different aproach to run commands. If nSpawn does not exist this can be a solution. Keep in mind this module is experimental.
- **1.0.6** - `stripTerminalColors` - removes from putput the colors, so the output is just a text.

This module is **experimental**.

```js
// To output just to the terminal use option: `{stdio: 'inherit'}`
// To strip the terminal colors use `stripTerminalColors`
const result = nSpawn("nexss Id --something='x y z'", { stripTerminalColors: true });

{exitCode: int,
stderr: string,
stdout: string
cmd: string
args: array // parsed arguments (1.0.7+)
command: string // just orginal command (1.0.7+)
}

```
