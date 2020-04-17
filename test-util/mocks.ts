import { TaskGroupResult } from '../src/types';
import { RunContext } from '../src/panel/machine';

export const storyName = 'fake-story-name';
export const samples: number = 10;
export const copies: number = 10;

export const groupResults: TaskGroupResult[] = [
  {
    groupId: 'Server',
    map: {
      'preset::unique-id:0': {
        type: 'timed',
        taskId: 'preset::unique-id:0',
        averageMs: 22.105499991448596,
        samples,
        variance: {
          upperPercentage: 24.652236084297556,
          lowerPercentage: 21.46750806485897,
          standardDeviation: 3.0939573814326295,
        },
      },
      'preset::unique-id:1': {
        type: 'timed',
        taskId: 'preset::unique-id:1',
        averageMs: 18.39450001134537,
        samples,
        variance: {
          upperPercentage: 14.409198338320309,
          lowerPercentage: 8.831444306165647,
          standardDeviation: 1.3026404839336465,
        },
      },
      'preset::unique-id:2': { type: 'static', taskId: 'preset::unique-id:2', value: '14.33' },
      'preset::unique-id:3': { type: 'static', taskId: 'preset::unique-id:3', value: '0.84' },
      'preset::unique-id:4': { type: 'static', taskId: 'preset::unique-id:4', value: '14.33' },
      'preset::unique-id:5': { type: 'static', taskId: 'preset::unique-id:5', value: '0.84' },
    },
  },
  {
    groupId: 'Client',
    map: {
      'preset::unique-id:6': {
        type: 'timed',
        taskId: 'preset::unique-id:6',
        averageMs: 53.10750000644475,
        samples,
        variance: {
          upperPercentage: 15.774608116455763,
          lowerPercentage: 11.020100781641199,
          standardDeviation: 3.7380885891370674,
        },
      },
      'preset::unique-id:8': {
        type: 'error',
        taskId: 'preset::unique-id:8',
        reason: 'unhandled',
        message: null,
      },
      'preset::unique-id:7': {
        type: 'timed',
        taskId: 'preset::unique-id:7',
        averageMs: 46.50500000570901,
        samples,
        variance: {
          upperPercentage: 8.525964972169188,
          lowerPercentage: 4.719922543470538,
          standardDeviation: 1.7941822695299157,
        },
      },
      'preset::unique-id:9': { type: 'static', taskId: 'preset::unique-id:9', value: '130' },
    },
  },
  {
    groupId: 'Interactions',
    map: {
      'interaction::(index:0)(name:Display dropdown)': {
        type: 'timed',
        taskId: 'interaction::(index:0)(name:Display dropdown)',
        averageMs: 319.0554999979213,
        samples,
        variance: {
          upperPercentage: 19.29585918854299,
          lowerPercentage: 7.663400253343148,
          standardDeviation: 24.849857592616424,
        },
      },
    },
  },
];

export const runContext: RunContext = {
  results: groupResults,
  samples,
  copies,
};
