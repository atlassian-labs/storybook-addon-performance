import { PublicInteractionTask, TimedTask, TaskGroup } from '../types';

export function getInteractionGroup(interactions: PublicInteractionTask[]): TaskGroup {
  const timed: TimedTask[] = interactions.map(
    (item: PublicInteractionTask, index: number): TimedTask => {
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
