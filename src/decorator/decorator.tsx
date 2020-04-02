import React from 'react';
import { makeDecorator } from '@storybook/addons';
import Runner from './runner';
import * as constants from '../addon-constants';

console.log('ADDING PERFORMANCE DECORATOR!');

export default makeDecorator({
  name: constants.decoratorKey,
  parameterName: constants.paramKey,
  // We are enabling the addon for all stories
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    // const channel = addons.getChannel();

    // Our API above sets the notes parameter to a string,
    // which we send to the channel
    // setInterval(() => console.log('it\s time'), 1000);
    // we can also add subscriptions here using channel.on('eventName', callback);

    return <Runner getNode={() => getStory(context)} />;
  },
});
