# @tomjs/vite-plugin-target

Make Vite support Electron, Node.js, etc.

[![NPM version](https://img.shields.io/npm/v/@tomjs/vite-plugin-target)](https://npmjs.com/package/@tomjs/vite-plugin-target) ![NPM](https://img.shields.io/npm/l/@tomjs/release-cli)

This library just fixes the types issue of [vite-plugin-target](https://github.com/vite-plugin/vite-plugin-target)

## Install

```sh
# pnpm
pnpm add @tomjs/vite-plugin-target -D

# yarn
yarn add @tomjs/vite-plugin-target -D

# npm
npm add @tomjs/vite-plugin-target -D
```

## Examples

- [electron](https://github.com/tomjs/vite-plugin-target/tree/main/examples/electron) - with [Vite](https://vitejs.dev/).
- [vite-electron-plugin](https://github.com/tomjs/vite-plugin-target/tree/main/examples/vite-electron-plugin) - with [vite-electron-plugin](https://github.com/electron-vite/vite-electron-plugin).

## Usage

```js
import target from '@tomjs/vite-plugin-target'

// Electron Renderer
export default {
  plugins: [
    target({
      'electron-renderer': {},
    }),
  ],
}

// Electron Preload
export default {
  plugins: [
    target({
      'electron-preload': {},
    }),
  ],
}

// Electron Main
export default {
  plugins: [
    target({
      'electron-main': {},
    }),
  ],
}

// Node.js
export default {
  plugins: [
    target({
      node: {},
    }),
  ],
}
```

## API <sub><sup>(Define)</sup></sub>

`target(options: Options)`

```ts
export interface NodeOptions {
  /**
   * Pass to `config.esbuild.target`
   */
  version?: string;
}

export interface ElectronOptions extends NodeOptions {
  nodeIntegration?: boolean;
}

export type Options =
  | { node: NodeOptions }
  | { 'electron-main': NodeOptions }
  | { 'electron-preload': ElectronOptions }
  | { 'electron-renderer': ElectronOptions };
```

## How to work?

- For `node` `electron-main` `electron-preload`, the plugin only changes a few preset configurations.

- `electron-renderer` with `nodeIntegration`.

  ```
  ┏————————————————————————————————————————┓                    ┏—————————————————┓
  │ import { ipcRenderer } from 'electron' │                    │ Vite dev server │
  ┗————————————————————————————————————————┛                    ┗—————————————————┛
                     │                                                   │
                     │ 1. HTTP(Request): electron module                 │
                     │ ————————————————————————————————————————————————> │
                     │                                                   │
                     │                                                   │
                     │ 2. Intercept in load-hook(Plugin)                 │
                     │ 3. Generate a virtual ESM module(electron)        │
                     │    ↓                                              │
                     │    const { ipcRenderer } = require('electron')    │
                     │    export { ipcRenderer }                         │
                     │                                                   │
                     │                                                   │
                     │ 4. HTTP(Response): electron module                │
                     │ <———————————————————————————————————————————————— │
                     │                                                   │
  ┏————————————————————————————————————————┓                    ┏—————————————————┓
  │ import { ipcRenderer } from 'electron' │                    │ Vite dev server │
  ┗————————————————————————————————————————┛                    ┗—————————————————┛
  ```
