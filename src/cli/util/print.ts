/* eslint-disable no-console */
export const debug = (...args: any[]) => console.warn(...args);
export const stdout = (...args: any[]) => console.log(...args);

export const usage = () =>
  debug(`
  Please input two directories – one containing the current test results,
  and one containing the baseline to compare it against.

  Usage
    $ sb-perf -c <[current-results-path]> -b <[baseline-path]>

    Arguments
      -c        Directory of performance test results of current state
      -b        Directory of baseline test results

    Example
      $ sb-perf -c current -b baseline
`);
