import serverSide from './server-side';
import getGroups from './client';
import { TaskGroup } from '../../types';

export default function getPresets({ clientOnly = false }: { clientOnly: boolean }): TaskGroup[] {
  const clientGroups = getGroups(clientOnly);
  return clientOnly ? [clientGroups] : [serverSide, clientGroups];
}
