<h1 align="center">storybook-addon-performance-cli 💻</h1>

## Installation

```bash
# yarn
yarn add storybook-addon-performance-cli --dev

# npm
npm install storybook-addon-performance-cli --save-dev
```

## Usage

The CLI is designed to be used in conjunction with the artifacts
produced by the `storybook-addon-performance` and the Save API.

A collection of artifact JSON files (1-n) should be in placed in directories representing the
current and the baseline results.

Use the flags `-c` and `-b` to specific the current and baseline directories respectively.

```bash
$ sb-perf -c <current> -b <baseline>
```

This will output a directory `sb-perf` with a number of comparison artifacts.

### Why directories?

In our analysis there is some natural variability
between individual runs / artifacts. By using a many artifacts we get better overall approximations and see
less outliers. That said the CLI will work perfectly fine with only a single artifact.

### Example

Given a directory structure like this:

```
base/
 - result1.json
 - result2.json

other/
 - result1.json
 - result2.json
```

You would run the cli with:

```bash
$ sb-perf -c other -b base
```

Which produces the following artifacts in the current directory:

```bash
sb-perf/
  # a confluence atlassian data format which can be loaded as pretty comparison table
  - adf.json
  # The aggregate data in the baseline directory
  - baseline.json
  # The comparison data
  - current-vs-baseline.json
  # The aggregate data in the current directory
  - current.json
```

## Thanks

Made with ❤️ by your friends at [Atlassian](https://www.atlassian.com/)

- Alex Hinds [@DarkPurple141](https://twitter.com/al_hinds)
- Safira Nugroho [@safiranugroho](https://github.com/safiranugroho)

<br/>

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
