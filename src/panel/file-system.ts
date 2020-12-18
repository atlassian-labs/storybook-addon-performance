import { hiddenFileAnchorId } from '../selectors';
import { RunContext } from './machine';

export function saveFile(storyName: string, current: RunContext) {
  const anchor = document.getElementById(hiddenFileAnchorId);

  if (anchor) {
    anchor.setAttribute(
      'href',
      'data:text/json,' + encodeURIComponent(JSON.stringify(current, null, 2)),
    );
    anchor.setAttribute('download', `${storyName}.json`);
    anchor.click();
  }
}

export function readFile(
  e: React.FormEvent<HTMLInputElement>,
  callback: (context: RunContext, storyFile: string) => void,
) {
  const reader = new FileReader();
  const { files } = e.currentTarget;

  if (files && files.length) {
    reader.readAsText(files[0]);
    reader.onload = ({ target }) => {
      if (target) {
        const context: RunContext = JSON.parse(target.result as string);
        const [storyName] = files[0].name.split('.json');
        callback(context, storyName);
      }
    };
  }
}
