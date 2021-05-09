# @nexssp/system

- **1.0.8** - `stripTerminalColors` - removes from putput the colors, so the output is just a text.

This module is **experimental**.

```js
// To output just to the terminal use option: `{stdio: 'inherit'}`
// To strip the terminal colors use `stripTerminalColors`
const result = nSpawn("nexss Id --something='x y z'", { stripTerminalColors: true });



{exitCode: int,
stderr: string,
stdout: string}

```
