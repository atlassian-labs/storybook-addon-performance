import { PublicInteractionTask, AllowedGroup, TaskGroup } from '../types';
import client from './preset/client';
import server from './preset/server';
import { getInteractionGroup } from './get-interaction-group';

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
    result.push(client);
  }

  result.push(getInteractionGroup(interactions));

  return result;
}
