import { TaskGroupResult } from '../src/types';
import { RunContext } from '../src/panel/machine';

export const storyName = 'fake-story-name';
export const samples: number = 10;
export const copies: number = 10;

export const groupResults: TaskGroupResult[] = [
  {
    groupId: 'Server',
    map: {
      'Render to string': {
        type: 'timed',
        taskName: 'Render to string',
        averageMs: 18.437499995343387,
        samples: 10,
        variance: {
          upperPercentage: 15.037288040689816,
          lowerPercentage: 16.474576229128438,
          standardDeviation: 2.024594097840528,
        },
      },
      'Render to static markup (cannot be hydrated)': {
        type: 'timed',
        taskName: 'Render to static markup (cannot be hydrated)',
        averageMs: 14.930999994976446,
        samples: 10,
        variance: {
          upperPercentage: 14.258924315167054,
          lowerPercentage: 6.43627349358861,
          standardDeviation: 0.9656339848818386,
        },
      },
      'String output size': { type: 'static', taskName: 'String output size', value: '14.33' },
      'String output size (gzip)': {
        type: 'static',
        taskName: 'String output size (gzip)',
        value: '0.84',
      },
      'Static markup output size': {
        type: 'static',
        taskName: 'Static markup output size',
        value: '14.33',
      },
      'Static markup output size (gzip)': {
        type: 'static',
        taskName: 'Static markup output size (gzip)',
        value: '0.84',
      },
    },
  },
  {
    groupId: 'Client',
    map: {
      'Initial render': {
        type: 'timed',
        taskName: 'Initial render',
        averageMs: 45.291499997256324,
        samples: 10,
        variance: {
          upperPercentage: 10.39599039861205,
          lowerPercentage: 11.79360363822285,
          standardDeviation: 3.5473680738394884,
        },
      },
      'Re render': {
        type: 'timed',
        taskName: 'Re render',
        averageMs: 22.232000005897135,
        samples: 10,
        variance: {
          upperPercentage: 15.486685880162348,
          lowerPercentage: 12.243612775999072,
          standardDeviation: 1.7607302461130605,
        },
      },
      Hydrate: {
        type: 'timed',
        taskName: 'Hydrate',
        averageMs: 38.209999998798594,
        samples: 10,
        variance: {
          upperPercentage: 5.626799229970686,
          lowerPercentage: 5.770740636265473,
          standardDeviation: 1.3656793121343955,
        },
      },
      'Complete render (mount + layout + paint)': {
        type: 'timed',
        taskName: 'Complete render (mount + layout + paint)',
        averageMs: 48.659499996574596,
        samples: 10,
        variance: {
          upperPercentage: 3.2480810239156224,
          lowerPercentage: 2.2390283530976323,
          standardDeviation: 0.6435621538816768,
        },
      },
      'DOM element count': { type: 'static', taskName: 'DOM element count', value: '130' },
      'DOM element count (no nested inline svg elements)': {
        type: 'static',
        taskName: 'DOM element count (no nested inline svg elements)',
        value: '120',
      },
      'React Fiber node count': {
        type: 'static',
        taskName: 'React Fiber node count',
        value: '461',
      },
    },
  },
  {
    groupId: 'Interactions',
    map: {
      'Display dropdown': {
        type: 'timed',
        taskName: 'Display dropdown',
        averageMs: 250.1429999974789,
        samples: 10,
        variance: {
          upperPercentage: 22.240078670701017,
          lowerPercentage: 7.624838587831113,
          standardDeviation: 21.225114623903043,
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
