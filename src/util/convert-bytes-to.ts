import toFixed from './to-fixed';

export function bytesToKiloBytes(bytes: number): string {
  return toFixed(bytes / Math.pow(10, 3));
}

export function bytesToMegaBytes(bytes: number): string {
  return toFixed(bytes / Math.pow(10, 6));
}
