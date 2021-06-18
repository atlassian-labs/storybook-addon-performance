import server from './server';
import client from './client';
import { TaskGroup } from '../../types';

const preset: TaskGroup[] = [server, client];
export default preset;
