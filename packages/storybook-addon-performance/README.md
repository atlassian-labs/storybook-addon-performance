<h1 align="center">storybook-addon-performance 🚀</h1>
<div align="center">

A [storybook](https://storybook.js.org/) addon to help better understand and debug performance for `React` components

<img src="https://user-images.githubusercontent.com/2182637/78786875-c904d000-79ec-11ea-9d49-1e253129f450.gif"
  alt="storybook-addon-performance demo"  />

🚧 This addon is **experimental** and a **work in progress**. We are not on stable versions yet 🚧

[📺 Project overview](https://www.youtube.com/watch?v=AknVkHeYqqg&feature=youtu.be&t=283) by
[Jack Herrington](https://twitter.com/jherr)

</div>

## Highlights 🌟

- **Zero config** (except for interactions): Generate performance information relating to server-side rendering and client-side mounting without any configuration
- **Pin results**: You can run some tasks, pin the result, make some changes, rerun the tasks and see what changed
- **Interactions**: Add your own custom user interactions to run as a parameter to your story. This lets you time how long interactions take. The API for this is super flexible and powerful!
- **Control**: Run all tasks for an overview, or run individual tasks to drill down on specific problems
- **Marked**: All tasks are marked with the [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API/Using_the_User_Timing_API) to allow for easy debugging of individual tasks in your browser's performance profiler

<img width="400" alt="Marking tasks" src="https://user-images.githubusercontent.com/2182637/78856031-e8d9d980-7a68-11ea-823c-f7effb67740a.png">

## Installation

1. Install `storybook-addon-performance`

```bash
# yarn
yarn add storybook-addon-performance --dev

# npm
npm install storybook-addon-performance --save-dev
```

2. Register the addon in `.storybook/main.js`

```js
module.exports = {
  addons: ['storybook-addon-performance/register'],
};
```

3. Add the decorator

You can either add the decorator globally to every story in `.storybook/preview.js` **(recommended)**

```js
import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

addDecorator(withPerformance);
```

Or you can add it to individual stories:

> Using [Component Story Format (CSF)](https://storybook.js.org/docs/formats/component-story-format/)

```js
import MyComponent from './MyComponent';
import { withPerformance } from 'storybook-addon-performance';

export default {
  title: 'MyComponent',
  component: MyComponent,
  decorators: [withPerformance],
};
```

> Using [StoriesOf API](https://storybook.js.org/docs/formats/storiesof-api/)

```js
import MyComponent from './MyComponent';
import { withPerformance } from 'storybook-addon-performance';

storiesOf('MyComponent', module)
  .addDecorator(withPerformance)
  .add('MyComponent', () => <MyComponent />);
```

## Usage: Interactions

Interaction tasks are a task type that can be defined and run on a story-by-story basis. They are useful for timing the interactive performance of your components.

To define your interaction tasks, first create an array of objects, each containing the `name` and `description` (optional) of the task, and a `run` function that performs whatever tasks you'd like to measure:

```js
import { InteractionTaskArgs, PublicInteractionTask } from 'storybook-addon-performance';
import { findByText, fireEvent } from '@testing-library/dom';

// ...

const interactionTasks: PublicInteractionTask[] = [
  {
    name: 'Display dropdown',
    description: 'Open the dropdown and wait for Option 5 to load',
    run: async ({ container }: InteractionTaskArgs): Promise<void> => {
      const element: HTMLElement | null = container.querySelector('.addon__dropdown-indicator');
      invariant(element);
      fireEvent.mouseDown(element);
      await findByText(container, 'Option 5', undefined, { timeout: 20000 });
    },
  },
];
```

The `run` function in each task object takes two arguments:

- `container`: an HTMLElement container that contains a rendered instance of the story component
- `controls`: contains an async timing function that can be optionally called to specify when to start and finish measurements; otherwise the time taken to complete the entire `run` function is measured. Useful when a task involves some set-up work.

  To use, wrap the operations in question with `controls.time` as shown below:

  ```js
  run: async ({ container }: InteractionTaskArgs): Promise<void> => {
    // setup
    await controls.time(async () => {
      // interaction task you'd like to measure
    });
  };
  ```

Note that you can use whatever libraries you'd like to perform these interaction tests – the example above uses `@testing-library/dom` to open the select in the example and wait for a specific item.

You can then include the array of interaction tasks inside the `performance` parameters of your story, with the key `interactions`:

```js
// Using the Component Story Format (CSF)
// https://storybook.js.org/docs/formats/component-story-format/
import { findByText, fireEvent } from '@testing-library/dom';
import { PublicInteractionTask } from 'storybook-addon-performance';
import React from 'react';
import Select from 'react-select';
import invariant from 'tiny-invariant';

export default {
  title: 'React select example',
};

const interactionTasks: PublicInteractionTask[] = [
  {
    name: 'Display dropdown',
    description: 'Open the dropdown and wait for Option 5 to load',
    run: async ({ container }: InteractionTaskArgs): Promise<void> => {
      const element: HTMLElement | null = container.querySelector('.addon__dropdown-indicator');
      invariant(element);
      fireEvent.mouseDown(element);
      await findByText(container, 'Option 5', undefined, { timeout: 20000 });
    },
  },
];

select.story = {
  name: 'React select',
  parameters: {
    performance: {
      interactions: interactionTasks,
    },
  },
};
```

### Supplied types

As seen above, the plugin exports two type definitions to assist with creating your own interaction tasks:

- `PublicInteractionTask`: defines the object structure for an interaction task; pass an array of these tasks as a parameter to storybook, as shown above.
- `InteractionTaskArgs`: the arguments for an interaction task's `run` function

## Usage: Filtering task groups

Some components are not designed to work in server side rendering, or on the client. To support this we have created a _allowlist_ that you can optionally pass in to only allow the groups to run that you want to. To configure this option, set the `allowedGroups` option as part of a story's parameters.

- Default value: `['server', 'client']` (run everything)

```js
// Using [Component Story Format (CSF)](https://storybook.js.org/docs/formats/component-story-format/)
export const onlyClient = () => <p>A story only measuring client-side performance 👩‍💻</p>;

onlyClient.story = {
  parameters: {
    performance: {
      allowedGroups: ['client'],
    },
  },
};

export const onlyServer = () => <p>A story only measuring server-side performance ‍☁️</p>;

onlyServer.story = {
  parameters: {
    performance: {
      allowedGroups: ['server'],
    },
  },
};
```

## Local addon development

```bash
# Start the typescript watcher and a local storybook:
yarn dev

# Start just the typescript watcher
# This is needed as storybook does not compile addons
yarn typescript:watch

# Start the local storybook
yarn storybook:dev
```

## Thanks

Made with ❤️ by your friends at [Atlassian](https://www.atlassian.com/)

- Alex Reardon [@alexandereardon](https://twitter.com/alexandereardon)
- Andrew Campbell [@andrewcampb_ll](https://twitter.com/andrewcampb_ll)
- Daniel Del Core [@danieldelcore](https://twitter.com/danieldelcore)

<br/>

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
