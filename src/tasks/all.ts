import { TaskGroup } from './../types';
import serverSide from './server-side';
import initialMount from './client';

const baseGroups: TaskGroup[] = [serverSide, initialMount];
export default baseGroups;
