import { packageName } from './addon-constants';

function prefix(selector: string) {
  return `${packageName}-${selector}`;
}

export const startAllButtonId: string = prefix('start-all-button');
export const panelId: string = prefix('panel');
export const sampleSelectId: string = prefix('sample-select');
export const copySelectId: string = prefix('copy-select');
export const pinButtonId: string = prefix('pin-button');
export const hiddenFileAnchorId: string = prefix('hidden-anchor');
export const loadButtonId: string = prefix('load-button');
export const saveButtonId: string = prefix('save-button');
