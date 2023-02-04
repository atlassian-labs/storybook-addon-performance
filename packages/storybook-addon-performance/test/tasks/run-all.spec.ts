import { runAll } from '../../src/task-runner';
import preset from '../../src/tasks/preset';
import { Task, TaskGroup, TaskGroupResult, TimedResult, AllowedGroup } from '../../src/types';
import getResultMap from '../../src/util/get-result-map';
import { StaticResult } from '../../src/types';

it('should run all the standard tests', async () => {
  const result = await runAll({
    groups: preset,
    getNode: () => 'hey',
    samples: 3,
    copies: 4,
  });

  const expected: TaskGroupResult[] = preset.map((group: TaskGroup): TaskGroupResult => {
    const staticResults: StaticResult[] = group.tasks
      .filter((t) => t.type === 'static')
      .map((task: Task): StaticResult => {
        return {
          type: 'static',
          taskName: task.name,
          value: expect.any(String),
        };
      });
    const timedResults: TimedResult[] = group.tasks
      .filter((t) => t.type === 'timed')
      .map((task: Task): TimedResult => {
        return {
          type: 'timed',
          taskName: task.name,
          averageMs: expect.any(Number),
          samples: 3,
          variance: {
            standardDeviation: expect.any(Number),
            upperPercentage: expect.any(Number),
            lowerPercentage: expect.any(Number),
          },
        };
      });

    return {
      groupId: group.groupId,
      map: getResultMap([...staticResults, ...timedResults]),
    };
  });

  expect(result).toEqual(expected);
});
