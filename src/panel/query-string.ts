import { Nullable } from './../types';
import { RunContext } from './machine';

const key: string = 'pinned';

export function setPinned(pinned: RunContext): void {
  const query = new URLSearchParams(window.location.search);
  if (query.has('pinned')) {
    console.error('pinned query string already set!');
    return;
  }
  history.replaceState(
    null,
    '',
    `${window.location.search}&pinned=${JSON.stringify(pinned)}`,
  );
}

export function getPinned(): Nullable<RunContext> {
  const query = new URLSearchParams(window.location.search);
  const raw: Nullable<string> = query.get(key);

  if (raw == null) {
    return null;
  }

  try {
    const pinned: RunContext = JSON.parse(raw);
    return pinned;
  } catch (e) {
    console.error('unable to parse query string', e);
    return null;
  }
}
