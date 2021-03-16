import { ResultMap } from '../types';

export type Results = {
  [key in keyof ResultMap]: number[];
};

export type ResultByGroupId = { [groupId: string]: Results };
