import { StaticResultMap, StaticResult, StaticTask, TimedResultMap } from './../src/types';
import { runAll } from '../src/task-runner';
import { TimedResult, TimedTask, TaskGroupResult, TaskGroup } from '../src/types';
import allGroups from '../src/tasks/all';
import toResultMap from '../src/util/to-result-map';

it('should run all the standard tests', async () => {
  const result = await runAll({
    groups: allGroups,
    getNode: () => 'hey',
    samples: 3,
    copies: 4,
  });

  const expected: TaskGroupResult[] = allGroups.map(
    (group: TaskGroup): TaskGroupResult => {
      const staticResults: StaticResultMap = toResultMap(
        group.static.map(
          (task: StaticTask): StaticResult => {
            return {
              taskName: task.name,
              groupName: group.name,
              value: expect.any(String) as string,
            };
          },
        ),
      );
      const timedResults: TimedResultMap = toResultMap(
        group.timed.map(
          (task: TimedTask): TimedResult => {
            return {
              taskName: task.name,
              groupName: group.name,
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
        groupName: group.name,
        timed: timedResults,
        static: staticResults,
      };
    },
  );

  expect(result).toEqual(expected);
});
