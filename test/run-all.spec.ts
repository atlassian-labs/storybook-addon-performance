import { StaticResultMap, StaticResult, StaticTask, TimedResultMap } from './../src/types';
import { runOneTimed, runAll } from '../src/task-runner';
import { timedTask } from '../src/tasks/create';
import { RunTimedTaskArgs, TimedResult, TimedTask, TaskGroupResult, TaskGroup } from '../src/types';
import { getAll } from '../src/tasks/all';
import toResultMap from '../src/util/to-result-map';

const all = getAll();

it('should run all the standard tests', async () => {
  const result = await runAll({
    groups: all.groups,
    getNode: () => 'hey',
    samples: 3,
    copies: 4,
  });

  const expected: TaskGroupResult[] = all.groups.map(
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
        groupId: group.groupId,
        timed: timedResults,
        static: staticResults,
      };
    },
  );

  expect(result).toEqual(expected);
});
