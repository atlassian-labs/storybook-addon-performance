import * as fs from 'fs';

import { debug, stdout } from './print';

export const writeFile = (description: string, fileName: string, content: string) => {
  const outputDir = 'sb-perf';
  const outputPath = `${fileName}.json`;

  fs.existsSync(outputDir) || fs.mkdirSync(outputDir);
  fs.writeFile(outputDir + '/' + outputPath, content, 'utf-8', (e) => {
    if (e) {
      return debug('💔 An error occurred – ', e);
    }

    stdout(`✨ ${description} is saved to ${outputDir}/${outputPath}!`);
  });
};
