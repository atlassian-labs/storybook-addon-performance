import { useContext, Context } from 'react';
import invariant from 'tiny-invariant';
import type { Nullable } from './types';

export default function useRequiredContext<T>(Context: Context<Nullable<T>>): T | never {
  const value: Nullable<T> = useContext(Context);
  invariant(value, 'Could not find context value');

  // Hack for TypeScript < 8.4
  return value as T;
}
