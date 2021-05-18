import { ResultMap } from '../types';
import { performCalculations } from './utils';

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

export type CalculationsByGroupId = { [groupId: string]: Calculation[] };
export type CalculationsByDirectory = { [name: string]: CalculationsByGroupId };
