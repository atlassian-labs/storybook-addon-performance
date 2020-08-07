// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

function fallbackWith(obj: Record<string, any>, key: string, fallback: (...args: any[]) => any) {
  if (!(key in obj)) {
    obj[key] = fallback;
  }
}

// doesn't exist in jsdom
fallbackWith(performance, 'mark', noop);
fallbackWith(performance, 'measure', noop);

// close enough
fallbackWith(window, 'requestIdleCallback', window.requestAnimationFrame);
