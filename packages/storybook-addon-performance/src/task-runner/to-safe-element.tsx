import React from 'react';

// A () => React.ReactNode function can include hooks in themselves.
// The function will need to host to be rendered in if they are using hooks
// https://github.com/atlassian-labs/storybook-addon-performance/pull/15/files
function Host({ children }: { children: () => React.ReactNode }) {
  return <React.Fragment>{children()}</React.Fragment>;
}

type Args = {
  getNode: () => React.ReactNode;
  copies: number;
};

export default function toSafeElement({ getNode, copies }: Args): React.ReactElement {
  const nodes: React.ReactNode[] = Array.from({ length: copies }, (_, key) => (
    <Host key={key}>{getNode}</Host>
  ));
  return <React.Fragment>{nodes}</React.Fragment>;
}
