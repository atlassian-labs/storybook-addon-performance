import { PublicInteractionTask, AllowedGroup, TaskGroup, Task } from '../types';
import client from './preset/client';
import server from './preset/server';
import { getInteractionGroup } from './get-interaction-group';
import flatten from '../util/flatten';
import invariant from 'tiny-invariant';

function getDuplicateTaskNames(groups: TaskGroup[]): string[] {
  const tasks: Task[] = flatten(groups.map((group) => group.tasks));
  const allNames: string[] = tasks.map((task) => task.name);

  const duplicates: string[] = allNames.filter((name: string) => {
    return allNames.filter((value) => value === name).length > 1;
  });

  // duplicates will include two entries for every duplicate
  // using a Set to trip out the duplicates
  return [...new Set(duplicates)];
}

export function getGroups({
  allowedGroups,
  interactions,
}: {
  allowedGroups: AllowedGroup[];
  interactions: PublicInteractionTask[];
}): TaskGroup[] {
  const result: TaskGroup[] = [];

  if (allowedGroups.includes('server')) {
    result.push(server);
  }
  if (allowedGroups.includes('client')) {
    // Hydration, although run client-side, relies on renderToString and
    // should not be run if the plugin is configured to be client-only
    const tasks = allowedGroups.includes('server')
      ? client.tasks
      : client.tasks.filter((task) => task.name !== 'Hydrate');
    result.push({
      ...client,
      tasks,
    });
  }

  result.push(getInteractionGroup(interactions));

  const duplicateNames: string[] = getDuplicateTaskNames(result);

  invariant(
    !duplicateNames.length,
    `Tasks found with duplicate names: [${duplicateNames.join(',')}]`,
  );

  return result;
}
