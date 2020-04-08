import { PublicTimedTask, TimedTask, TaskGroup } from '../types';

export function getInteractionGroup(interactions: PublicTimedTask[]): TaskGroup {
  const timed: TimedTask[] = interactions.map(
    (item: PublicTimedTask, index: number): TimedTask => {
      return {
        ...item,
        type: 'timed',
        taskId: `interaction::(index:${index})(name:${item.name})`,
        description: item.description || '(None provided)',
      };
    },
  );

  return {
    uniqueName: 'Interactions',
    timed: timed,
    static: [],
  };
}
