import { packageName } from './addon-constants';

function prefix(selector: string) {
  return `${packageName}-${selector}`;
}

export const startAllButtonId: string = prefix('start-all-button');
export const panelId: string = prefix('panel');
export const sampleSelectId: string = prefix('sample-select');
export const copySelectId: string = prefix('copy-select');
