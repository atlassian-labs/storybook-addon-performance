import { TaskGroup } from '../types';
import { taskGroup } from './create';

const group: TaskGroup = taskGroup({
  name: 'Interactions',
  timed: [],
  static: [],
});

export default group;
