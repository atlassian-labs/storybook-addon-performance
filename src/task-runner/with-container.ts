import { addonKey, packageName } from './../addon-constants';
export default async function withContainer<T>(
  fn: (container: HTMLElement) => Promise<T>,
): Promise<T> {
  const container: HTMLElement = document.createElement('div');
  container.setAttribute(`data-${packageName}-managed-container`, 'true');
  container.style.visibility = 'invisible';
  document.body.appendChild(container);

  const result: T = await fn(container);

  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }

  return result;
}
