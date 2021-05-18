import { ResultMap } from '../types';

export type Results = {
  [key in keyof ResultMap]: number[];
};

export type ResultsByGroupId = { [groupId: string]: Results };
export interface Calculation {
  key: string;
  numberOfSamples: number;
  samples: number[];
  minValue: number;
  maxValue: number;
  meanValue: number;
  medianValue: number;
}
export interface CalculationWithDiff {
  key: string;
  diffPercentage: number;
  lite: Omit<Calculation, 'key'>;
  baseline: Omit<Calculation, 'key'>;
}

export type CalculationsByGroupId = { [groupId: string]: (Calculation | CalculationWithDiff)[] };
export type CalculationsByDirectory = { [name: string]: CalculationsByGroupId };
