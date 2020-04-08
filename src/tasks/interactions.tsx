import { PublicTimedTask, TaskGroup } from '../types';
import { timedTask } from './create';

export function getInterationGroup(interactions: PublicTimedTask[]): TaskGroup {
  const timed = interactions.map(interaction => timedTask({
    ...interaction,
    description: interaction.description || '(None provided)'
  }));

  return {
    name: 'Interactions',
    timed: timed,
    static: [],
  }
};
