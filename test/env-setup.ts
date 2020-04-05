// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
// doesn't exist in jsdom

function fallbackWithNoop(obj: Record<string, any>, key: string) {
  if (!(key in obj)) {
    obj[key] = noop;
  }
}

fallbackWithNoop(performance, 'mark');
fallbackWithNoop(performance, 'measure');
