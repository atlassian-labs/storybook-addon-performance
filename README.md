<p align="center">
  <img src="https://user-images.githubusercontent.com/2182637/78120940-78263200-7456-11ea-9953-8ca5285af518.png" alt="storybook-addon-performance logo" width="100px" />
</p>
<h1 align="center">storybook-addon-performance</h1>
<div align="center">

A [storybook](https://storybook.js.org/) developer companion to help better understand and debug performance for `React` components.

</div>

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
import { addPerformance } from 'storybook-addon-performance';

addDecorator(addPerformance);
```

Or you can add it to individual stories:

> Using [Component Story Format (CSF)](https://storybook.js.org/docs/formats/component-story-format/)

```js
import MyComponent from './MyComponent';
import addPerformance from 'storybook-addon-performance/decorator';

export default {
  title: 'MyComponent',
  component: MyComponent,
  decorators: [addPerformance],
};
```

> Using [StoriesOf API](https://storybook.js.org/docs/formats/storiesof-api/)

```js
import MyComponent from './MyComponent';
import addPerformance from 'storybook-addon-performance/decorator';

storiesOf('MyComponent', module)
  .addDecorator(addPerformance)
  .add('MyComponent', () => <MyComponent />);
```

Made with ❤️ by your friends at [Atlassian](https://www.atlassian.com/)
