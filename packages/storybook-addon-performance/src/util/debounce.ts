function debounce<F extends (...args: any[]) => any>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void;

function debounce<F extends (this: any, ...args: any[]) => any>(
  fn: F,
  delay: number,
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let currentTimeout: NodeJS.Timeout;

  return function (...args): void {
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

export default debounce;
