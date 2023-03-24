function waitForIdle(): Promise<void> {
  const idle = (window as any).requestIdleCallback;

  if (typeof idle !== 'function') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    idle(resolve);
  });
}

export default waitForIdle;
