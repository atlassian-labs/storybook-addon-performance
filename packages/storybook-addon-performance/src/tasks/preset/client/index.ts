import { TaskGroup } from '../../../types';

import { hydrate, render, reRender, completeRender } from './render';
import { domElementCount, domElementCountWithoutSvg } from './dom-element-count';
import reactFiberNodeCount from './react-fiber-node-count';

const group: TaskGroup = {
  groupId: 'Client',
  name: 'Client 👩‍💻',
  tasks: [
    render,
    reRender,
    hydrate,
    domElementCount,
    domElementCountWithoutSvg,
    completeRender,
    reactFiberNodeCount,
  ],
};

export default group;
