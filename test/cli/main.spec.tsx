import cli from '../../src/cli/main';

describe('cli', () => {
  afterAll(jest.restoreAllMocks);
  afterEach(jest.resetAllMocks);
  const infoMock = jest.fn();
  const warnMock = jest.fn();
  //@ts-ignore
  global.console = { info: infoMock, warn: warnMock };
  it('should show message if not provided correct args', () => {
    cli();
    expect(warnMock).toHaveBeenCalledWith(`Usage:
storybook-addon-performance <directory> [...<directory>] 

Example
storybook-addon-performance results-directory > outputfile.csv
# OR
storybook-addon-performance ABTestDirectory OtherDirectory > outputfile.csv
`);
  });

  it('should match snapshot', () => {
    cli('node', 'cli', __dirname + '/fixtures');
    expect(warnMock).not.toHaveBeenCalled();
    expect(infoMock).toHaveBeenCalled();
    expect(infoMock.mock.calls).toMatchSnapshot();
  });
});
