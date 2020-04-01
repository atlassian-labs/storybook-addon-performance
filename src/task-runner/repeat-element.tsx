import React from 'react';

export default function repeatElement(
  getNode: () => React.ReactNode,
  copies: number,
): React.ReactElement {
  const nodes: React.ReactNode[] = Array.from({ length: copies }, (_, key) => (
    <React.Fragment key={key}>{getNode()}</React.Fragment>
  ));
  return <React.Fragment>{nodes}</React.Fragment>;
}
