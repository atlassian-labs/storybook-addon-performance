import serverSide from './server-side';
import getGroups from './client';
import { TaskGroup, AllowedGroup } from '../../types';

// as const prevents widening to the "string" type
export const defaultAllowedGroups = ['server' as const, 'client' as const];

export default function getPresets({
  allowedGroups = defaultAllowedGroups,
}: {
  allowedGroups: AllowedGroup[];
}): TaskGroup[] {
  const clientGroups = getGroups(allowedGroups);
  const groups: TaskGroup[] = [];
  if (allowedGroups.includes('server')) {
    groups.push(serverSide);
  }
  if (allowedGroups.includes('client')) {
    groups.push(clientGroups);
  }
  return groups;
}
