<h1 align="center">storybook-addon-performance-cli 💻</h1>

## Installation

```bash
# pnpm
pnpm add storybook-addon-performance-cli --dev

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

### Usage in CI at Atlassian

At Atlassian we run the `storybook-addon-performance` in CI to compare branch performance. We do this in the following way:

We store a baseline branch story artifact in object storage. For example, the story for `@atlaskit/button` would be the `amazon.s3` key `/master/button/<story>`.

We then:

1. Deploy a story with/without interactions to a CDN - ensure this is a production build of storybook.
2. In a pipeline run puppeteer to vist and interact with the built CDN page. To control for memory/CPU flucutations of puppeteer we run this multiple times.
3. Each run is downloaded and saved as an artifact.
4. Artifacts are compared to the baseline branch using the `storybook-addon-performance-cli` - the schema and file format are built to be compatible.
5. The final results are then parsed and shown in the CI status.

This approach only works where the container being used to run the storybook is kept as consistent as possible (eg fixed memory / CPU allocation) and a
consistent environment. As soon as any of the test-runner software is updated you'd need to regenerate any baseline branch artifact.

Additionally this flow is only considered _indicative_ not scientific. If we see large fluctuations this can trigger further manual investigation.

## Thanks

Made with ❤️ by your friends at [Atlassian](https://www.atlassian.com/)

- Alex Hinds [@DarkPurple141](https://twitter.com/al_hinds)
- Safira Nugroho [@safiranugroho](https://github.com/safiranugroho)

<br/>

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
