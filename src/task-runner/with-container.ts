import ReactDOM from 'react-dom';
import { addonKey, packageName } from './../addon-constants';
export default async function withContainer<T>(
  fn: (container: HTMLElement) => Promise<T>,
): Promise<T> {
  const container: HTMLElement = document.createElement('div');
  // So we can find the element
  container.setAttribute(`data-${packageName}-managed-container`, 'true');
  // Preventing any awkward flashing for users
  container.style.visibility = 'invisible';

  document.body.appendChild(container);

  const result: T = await fn(container);

  // Cleanup any usages of react in the container
  ReactDOM.unmountComponentAtNode(container);

  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }

  return result;
}
