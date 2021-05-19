/* eslint-disable no-console */
export const debug = (...args: any[]) => console.warn(...args);
export const stdout = (...args: any[]) => console.log(...args);

export const usage = () =>
  debug(`
  Usage
    $ sb-perf <flag> <[path]>

    Arguments
      -l        Directory of performance test results of current state
      -b        Directory of baseline test results

    Example
      $ sb-perf -l lite -b baseline
`);
