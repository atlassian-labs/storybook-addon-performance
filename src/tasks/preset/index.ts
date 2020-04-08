import serverSide from './server-side';
import initialMount from './client';
import { TaskGroup } from '../../types';

const preset: TaskGroup[] = [serverSide, initialMount];

export default preset;
