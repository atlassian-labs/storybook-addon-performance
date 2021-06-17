type Args = {
  value: number;
  single: string;
  multiple: string;
};

export function pluralise({ value, single, multiple }: Args): string {
  return value === 1 ? single : multiple;
}

export function pluraliseCopies(copies: number): string {
  return pluralise({ value: copies, single: 'copy', multiple: 'copies' });
}

export function pluraliseSamples(samples: number): string {
  return pluralise({ value: samples, single: 'sample', multiple: 'samples' });
}
