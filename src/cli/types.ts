import { ResultMap } from '../types';

export type Results = {
  [key in keyof ResultMap]: number[];
};

export type ResultSet = {
  // name of the containing folder
  name: string;
  // client specific results
  client: Results;
  // server specific results
  server: Results;
  // interactions specific results
  interactions: Results;
  // number of result files in the directory
  results: number;
};
