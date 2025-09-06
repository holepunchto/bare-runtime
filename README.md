# bare-runtime

Prebuilt Bare binaries for macOS, iOS, Linux, Android, and Windows.

```
npm i [-g] bare-runtime
```

## API

> [!WARNING]
> These functions are currently subject to change between releases and are not by covered Semantic Versioning. The version of the prebuilds strictly match the corresponding Bare version. If your code depends on the APIs make sure to specify a fixed version (`1.2.3`) when declaring the module dependency.

#### `const prebuild = runtime([referrer][, options])`

Get the path to the Bare binary prebuild for the current platform. Will throw an error if no matching binary prebuild is found.

Options include:

```js
options = {
  platform: process.platform,
  arch: process.arch
}
```

### Spawning

The `bare-runtime/spawn` module provides a convenient way to spawn the Bare binary prebuilds as child processes, adding appropriate executable permissions as required.

#### `const process = spawn([referrer][, options])`

Options include:

```js
options = {
  platform: process.platform,
  arch: process.arch,
  args: process.argv.slice(2)
}
```

## CLI

The module exposes a CLI that as a convenience will spawn the Bare binary that matches your platform. See <https://github.com/holepunchto/bare#usage> for details on the `bare` CLI.

## License

Apache-2.0
