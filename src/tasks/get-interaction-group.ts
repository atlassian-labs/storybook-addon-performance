import { PublicInteractionTask, TaskGroup, InteractionTask } from '../types';

export const interactionGroupId: string = 'Interactions';

export function getInteractionGroup(interactions: PublicInteractionTask[]): TaskGroup {
  const tasks: InteractionTask[] = interactions.map(
    (item: PublicInteractionTask, index: number): InteractionTask => {
      return {
        ...item,
        type: 'interaction',
        taskId: `interaction::(index:${index})(name:${item.name})`,
        description: item.description || '(None provided)',
      };
    },
  );

  return {
    groupId: interactionGroupId,
    displayName: 'Interactions 🕹',
    tasks,
  };
}
