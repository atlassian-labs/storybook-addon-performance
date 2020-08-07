import { runAll } from '../../src/task-runner';
import preset from '../../src/tasks/preset';
import { Task, TaskGroup, TaskGroupResult, TimedResult, AllowedGroup } from '../../src/types';
import toResultMap from '../../src/util/to-result-map';
import { StaticResult } from '../../src/types';

it('should run all the standard tests', async () => {
  const result = await runAll({
    groups: preset,
    getNode: () => 'hey',
    samples: 3,
    copies: 4,
  });

  const expected: TaskGroupResult[] = preset.map(
    (group: TaskGroup): TaskGroupResult => {
      const staticResults: StaticResult[] = group.tasks
        .filter((t) => t.type === 'static')
        .map(
          (task: Task): StaticResult => {
            return {
              type: 'static',
              taskId: task.taskId,
              value: expect.any(String) as string,
            };
          },
        );
      const timedResults: TimedResult[] = group.tasks
        .filter((t) => t.type === 'timed')
        .map(
          (task: Task): TimedResult => {
            return {
              type: 'timed',
              taskId: task.taskId,
              averageMs: expect.any(Number) as number,
              samples: 3,
              variance: {
                standardDeviation: expect.any(Number) as number,
                upperPercentage: expect.any(Number) as number,
                lowerPercentage: expect.any(Number) as number,
              },
            };
          },
        );

      return {
        groupId: group.groupId,
        map: toResultMap([...staticResults, ...timedResults]),
      };
    },
  );

  expect(result).toEqual(expected);
});
