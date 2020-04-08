import { TimedTask, TaskGroup, PublicTimedTask } from '../types';
import { timedTask, taskGroup } from './create';

export function getInterationGroup(interactions: PublicTimedTask[]) {
  const timed = interactions.map(interaction => timedTask({
    ...interaction,
    description: interaction.description || '(None provided)'
  }));

  return taskGroup({
    name: 'Interactions',
    timed: timed,
    static: [],
  })
};
