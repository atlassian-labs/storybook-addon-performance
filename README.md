<p align="center">
  <img src="https://user-images.githubusercontent.com/2182637/78120940-78263200-7456-11ea-9953-8ca5285af518.png" alt="storybook-addon-performance logo" width="80px" />
</p>
<h1 align="center">storybook-addon-performance</h1>
<p align="center">

A [storybook](https://storybook.js.org/) addon to help better understand and debug performance for `React` components.

</p>

<p>
  <img src="https://user-images.githubusercontent.com/2182637/78786875-c904d000-79ec-11ea-9d49-1e253129f450.gif"
  alt="storybook-addon-performance demo"  />
</p>

<p align="center">

🚧 This addon is **experimental** and a **work in progress**. We are not on stable versions yet 🚧

</p>

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

## Usage: interactions

[TODO]

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
- Andrew Campbell [@hey_AndrewC](https://twitter.com/hey_AndrewC)
- Daniel Del Core [@danieldelcore](https://twitter.com/danieldelcore)
