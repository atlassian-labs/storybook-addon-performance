import ReactDOMServer from 'react-dom/server';
import gzip from 'gzip-js';
import { StaticTask, TimedTask, TaskGroup, RunStaticTaskArgs, RunTimedTaskArgs } from '../../types';
import { bytesToKiloBytes } from '../../util/convert-bytes-to';

const renderToString: TimedTask = {
  type: 'timed',
  name: 'Render to string',
  description: `This task records how long a ReactDOM.renderToString() call takes`,
  run: async ({ getElement }: RunTimedTaskArgs): Promise<void> => {
    ReactDOMServer.renderToString(getElement());
  },
};

const renderToStaticMarkup: TimedTask = {
  type: 'timed',
  name: 'Render to static markup (cannot be hydrated)',
  description: `
    This task records how long a ReactDOM.renderToStaticMarkup() call takes.
    This output cannot be hydrated on the client
  `,
  run: async ({ getElement }: RunTimedTaskArgs): Promise<void> => {
    ReactDOMServer.renderToStaticMarkup(getElement());
  },
};

const getRawStringSizeInKB: StaticTask = {
  type: 'static',
  name: 'String output size',
  description: `
    The size of the string generated by ReactDOM.renderToString().
  `,
  scale: 'kb',
  run: async ({ getElement }: RunStaticTaskArgs): Promise<string> => {
    const output: string = ReactDOMServer.renderToString(getElement());
    const blob: Blob = new Blob([output]);
    return bytesToKiloBytes(blob.size);
  },
};

const getGzipStringSizeInKB: StaticTask = {
  type: 'static',
  name: 'String output size (gzip)',
  description: `
    The gzipped size of the string generated by ReactDOM.renderToString().
  `,
  scale: 'kb',
  run: async ({ getElement }: RunStaticTaskArgs): Promise<string> => {
    const output: string = ReactDOMServer.renderToString(getElement());
    // Using max level of compression.
    // This is what Jira currently uses
    const bytes: number = gzip.zip(output, { level: 9 }).length;

    return bytesToKiloBytes(bytes);
  },
};

const getRawStaticMarkupSizeInKB: StaticTask = {
  type: 'static',
  name: 'Static markup output size',
  description: `
    The size of the string generated by ReactDOM.renderToStaticMarkup().
  `,
  scale: 'kb',
  run: async ({ getElement }: RunStaticTaskArgs): Promise<string> => {
    const output: string = ReactDOMServer.renderToStaticMarkup(getElement());
    const blob: Blob = new Blob([output]);
    return bytesToKiloBytes(blob.size);
  },
};

const getGzipStaticMarkupSizeInKB: StaticTask = {
  type: 'static',
  name: 'Static markup output size (gzip)',
  description: `
    The gzipped size of the string generated by ReactDOM.renderToStaticMarkup().
  `,
  scale: 'kb',
  run: async ({ getElement }: RunStaticTaskArgs): Promise<string> => {
    const output: string = ReactDOMServer.renderToStaticMarkup(getElement());
    // Using max level of compression.
    // This is what Jira currently uses
    const bytes: number = gzip.zip(output, { level: 9 }).length;

    return bytesToKiloBytes(bytes);
  },
};

const group: TaskGroup = {
  groupId: 'Server',
  name: 'Server ☁️',
  tasks: [
    renderToString,
    renderToStaticMarkup,
    getRawStringSizeInKB,
    getGzipStringSizeInKB,
    getRawStaticMarkupSizeInKB,
    getGzipStaticMarkupSizeInKB,
  ],
};

export default group;
