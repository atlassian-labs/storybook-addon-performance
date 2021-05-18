import { ResultMap } from '../types';
import { performCalculations } from './utils';

export type Results = {
  [key in keyof ResultMap]: number[];
};

export type ResultsByGroupId = { [groupId: string]: Results };

export type CalculationByGroupId = { [groupId: string]: ReturnType<typeof performCalculations> };
export type CalculationByDirectory = { [name: string]: CalculationByGroupId };
