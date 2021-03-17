import cli from '../../src/cli/main';

describe('cli', () => {
  afterAll(jest.restoreAllMocks);
  afterEach(jest.resetAllMocks);
  const infoMock = jest.fn();
  const warnMock = jest.fn();
  //@ts-ignore
  global.console = { log: infoMock, warn: warnMock };
  it('should show message if not provided correct args', () => {
    cli();
    expect(warnMock).toHaveBeenCalledWith(`Usage:
sb-perf <directory> [...<directory>]

Example
sb-perf results-directory > output-file.csv
# OR
sb-perf ABTestDirectory OtherDirectory > output-file.csv
`);
  });

  it('should match snapshot without interactions test results', () => {
    cli('node', 'cli', __dirname + '/fixtures/icon');
    expect(infoMock).toHaveBeenCalled();
    expect(infoMock.mock.calls).toMatchSnapshot();
    expect(warnMock.mock.calls).toMatchSnapshot();
  });

  it('should match snapshot with interactions test results', () => {
    cli('node', 'cli', __dirname + '/fixtures/menu');
    expect(infoMock).toHaveBeenCalled();
    expect(infoMock.mock.calls).toMatchSnapshot();
    expect(warnMock.mock.calls).toMatchSnapshot();
  });
});
