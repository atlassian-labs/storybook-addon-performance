import toFixed from './to-fixed';

export function bytesToKiloBytes(bytes: number): number {
  return toFixed(bytes / Math.pow(10, 3));
}

export function bytesToMegaBytes(bytes: number): number {
  return toFixed(bytes / Math.pow(10, 6));
}
