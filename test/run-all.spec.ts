import { runAll } from '../src/task-runner';
import preset from '../src/tasks/preset';
import { TaskGroup, TaskGroupResult, TimedResult, TimedTask } from '../src/types';
import toResultMap from '../src/util/to-result-map';
import { StaticResult, StaticResultMap, StaticTask, TimedResultMap } from './../src/types';

it('should run all the standard tests', async () => {
  const result = await runAll({
    groups: preset,
    getNode: () => 'hey',
    samples: 3,
    copies: 4,
  });

  const expected: TaskGroupResult[] = preset.map(
    (group: TaskGroup): TaskGroupResult => {
      const staticResults: StaticResultMap = toResultMap(
        group.static.map(
          (task: StaticTask): StaticResult => {
            return {
              taskId: task.taskId,
              value: expect.any(String) as string,
            };
          },
        ),
      );
      const timedResults: TimedResultMap = toResultMap(
        group.timed.map(
          (task: TimedTask): TimedResult => {
            return {
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
        ),
      );

      return {
        groupName: group.uniqueName,
        timed: timedResults,
        static: staticResults,
      };
    },
  );

  expect(result).toEqual(expected);
});
