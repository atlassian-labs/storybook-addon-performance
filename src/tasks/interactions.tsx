import { InteractionTaskBase, TaskGroup } from '../types';
import { timedTask, taskGroup } from './create';

// const group: TaskGroup = taskGroup({
//   name: 'Interactions',
//   timed: [],
//   static: [],
// });

export function AddInteractionTasks(interactions: InteractionTaskBase[]) {
  const timedInteractionTasks = interactions.map(interaction => timedTask({
    name: interaction.name,
    description: interaction.description ? interaction.description : "",
    run: (interaction.run),
  }));
  return taskGroup({
    name: 'Interactions',
    timed: timedInteractionTasks || [],
    static: [],
  })
};
