import * as fs from 'fs';

import cli from '../../src/cli/main';

import expectedMenuOutput from './expected/menu';
import expectedIconOutput from './expected/icon';
import expectedDiffOutput from './expected/icon-vs-menu';
import expectedADFOutput from './expected/adf';

jest.mock('fs', () => ({
  readdirSync: jest.requireActual('fs').readdirSync,
  readFileSync: jest.requireActual('fs').readFileSync,
  writeFile: jest.fn(),
}));

describe('cli', () => {
  afterAll(jest.restoreAllMocks);
  afterEach(jest.resetAllMocks);

  const warnMock = jest.fn();

  //@ts-ignore
  global.console = { warn: warnMock };

  it('should show message if not provided correct args', () => {
    cli();
    expect(warnMock).toHaveBeenCalledWith(`
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
  });

  it('should save the formatted output to a summary file', () => {
    cli('node', 'cli', '-c', __dirname + '/fixtures/icon', '-b', __dirname + '/fixtures/menu');

    expect(fs.writeFile).toHaveBeenNthCalledWith(
      1,
      'p-menu.json',
      JSON.stringify(expectedMenuOutput),
      'utf-8',
      expect.any(Function),
    );

    expect(fs.writeFile).toHaveBeenNthCalledWith(
      2,
      'p-icon.json',
      JSON.stringify(expectedIconOutput),
      'utf-8',
      expect.any(Function),
    );
  });

  it('should save the diff calculations to a summary file', () => {
    cli('node', 'cli', '-c', __dirname + '/fixtures/icon', '-b', __dirname + '/fixtures/menu');

    expect(fs.writeFile).toHaveBeenNthCalledWith(
      3,
      'p-current-vs-baseline.json',
      JSON.stringify(expectedDiffOutput),
      'utf-8',
      expect.any(Function),
    );
  });

  it('should generate an Editor ADF and save it to a file', () => {
    cli('node', 'cli', '-c', __dirname + '/fixtures/icon', '-b', __dirname + '/fixtures/menu');

    expect(fs.writeFile).toHaveBeenNthCalledWith(
      4,
      'p-adf.json',
      JSON.stringify(expectedADFOutput),
      'utf-8',
      expect.any(Function),
    );
  });
});
