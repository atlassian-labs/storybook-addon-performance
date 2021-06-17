function waitForFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

type MapArgs<FromValue, ToValue> = {
  source: FromValue[];
  map: (item: FromValue, index: number, list: FromValue[]) => Promise<ToValue>;
};

export async function asyncMap<FromValue, ToValue>({
  source,
  map,
}: MapArgs<FromValue, ToValue>): Promise<ToValue[]> {
  const results: ToValue[] = [];

  for (let i = 0; i < source.length; i++) {
    await waitForFrame();
    const value: ToValue = await map(source[i], i, source);
    results.push(value);
  }
  return results;
}

type ForArgs = {
  count: number;
  fn: (index: number) => Promise<void>;
};

export async function asyncFor({ count, fn }: ForArgs): Promise<void> {
  for (let i = 0; i < count; i++) {
    await waitForFrame();
    await fn(i);
  }
}
