import serverSide from './server-side';
import getGroups from './client';
import { TaskGroup, AllowedGroup } from '../../types';

export const defaultAllowedGroups = [AllowedGroup.Server, AllowedGroup.Client];

export default function getPresets({
  allowedGroups = defaultAllowedGroups,
}: {
  allowedGroups: AllowedGroup[];
}): TaskGroup[] {
  const clientGroups = getGroups(allowedGroups);
  const groups: TaskGroup[] = [];
  if (allowedGroups.includes(AllowedGroup.Server)) {
    groups.push(serverSide);
  }
  if (allowedGroups.includes(AllowedGroup.Client)) {
    groups.push(clientGroups);
  }
  return groups;
}
