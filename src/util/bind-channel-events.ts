import { Channel } from '@storybook/channels';

export type Binding = {
  eventName: string;
  fn: (...args: any[]) => void;
};

export function bind(channel: Channel, binding: Binding) {
  channel.on(binding.eventName, binding.fn);
  return function unbind() {
    channel.off(binding.eventName, binding.fn);
  };
}

export function bindAll(channel: Channel, bindings: Binding[]) {
  const unbinds: (() => void)[] = bindings.map((binding: Binding) => bind(channel, binding));

  return function unbindAll() {
    unbinds.forEach((unbind) => unbind());
  };
}
