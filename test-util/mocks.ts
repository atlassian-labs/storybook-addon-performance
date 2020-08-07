import { TaskGroupResult } from '../src/types';
import { RunContext } from '../src/panel/machine';

export const storyName = 'fake-story-name';
export const samples: number = 10;
export const copies: number = 10;

export const groupResults: TaskGroupResult[] = [
  {
    groupId: 'Server',
    map: {
      'preset::unique-id:7': {
        type: 'timed',
        taskId: 'preset::unique-id:7',
        averageMs: 16.347500003757887,
        samples: 10,
        variance: {
          upperPercentage: 23.74980877795315,
          lowerPercentage: 15.981036783323018,
          standardDeviation: 2.3455247299536865,
        },
      },
      'preset::unique-id:8': {
        type: 'timed',
        taskId: 'preset::unique-id:8',
        averageMs: 14.008499993360601,
        samples: 10,
        variance: {
          upperPercentage: 14.39483169140364,
          lowerPercentage: 7.413356264227891,
          standardDeviation: 1.011266660364238,
        },
      },
      'preset::unique-id:9': { type: 'static', taskId: 'preset::unique-id:9', value: '14.33' },
      'preset::unique-id:10': { type: 'static', taskId: 'preset::unique-id:10', value: '0.84' },
      'preset::unique-id:11': {
        type: 'static',
        taskId: 'preset::unique-id:11',
        value: '14.33',
      },
      'preset::unique-id:12': { type: 'static', taskId: 'preset::unique-id:12', value: '0.84' },
    },
  },
  {
    groupId: 'Client',
    map: {
      'preset::unique-id:0': {
        type: 'timed',
        taskId: 'preset::unique-id:0',
        averageMs: 33.7085000006482,
        samples: 10,
        variance: {
          upperPercentage: 53.58144085302733,
          lowerPercentage: 28.32668317966413,
          standardDeviation: 9.431718042927884,
        },
      },
      'preset::unique-id:2': {
        type: 'timed',
        taskId: 'preset::unique-id:2',
        averageMs: 17.56850000238046,
        samples: 10,
        variance: {
          upperPercentage: 17.084554688937313,
          lowerPercentage: 21.450322945551903,
          standardDeviation: 1.8218507749456447,
        },
      },
      'preset::unique-id:1': {
        type: 'timed',
        taskId: 'preset::unique-id:1',
        averageMs: 24.524500002735294,
        samples: 10,
        variance: {
          upperPercentage: 25.079002564046572,
          lowerPercentage: 8.703541373848548,
          standardDeviation: 2.242791172841424,
        },
      },
      'preset::unique-id:5': {
        type: 'timed',
        taskId: 'preset::unique-id:5',
        averageMs: 36.793999999645166,
        samples: 10,
        variance: {
          upperPercentage: 34.87253360515639,
          lowerPercentage: 11.656791839848179,
          standardDeviation: 6.15493493492205,
        },
      },
      'preset::unique-id:3': { type: 'static', taskId: 'preset::unique-id:3', value: '130' },
      'preset::unique-id:4': { type: 'static', taskId: 'preset::unique-id:4', value: '120' },
      'preset::unique-id:6': { type: 'static', taskId: 'preset::unique-id:6', value: '461' },
    },
  },
  {
    groupId: 'Interactions',
    map: {
      'interaction::(index:0)(name:Display dropdown)': {
        type: 'timed',
        taskId: 'interaction::(index:0)(name:Display dropdown)',
        averageMs: 177.05949999799486,
        samples: 10,
        variance: {
          upperPercentage: 8.810879960011455,
          lowerPercentage: 7.282580151564158,
          standardDeviation: 9.851067060814993,
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
