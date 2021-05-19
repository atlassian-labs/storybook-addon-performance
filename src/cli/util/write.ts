import * as fs from 'fs';

import { debug, stdout } from './print';

export const writeFile = (outputPath: string, content: string, successMessage: string) => {
  fs.writeFile(outputPath, content, 'utf-8', (e) => {
    if (e) {
      return debug('💔 An error occurred – ', e);
    }

    stdout(`✨ ${successMessage}`);
  });
};
