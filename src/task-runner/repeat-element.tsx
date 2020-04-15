import React from 'react';

/**
 * Elements need a host to render within so that hooks defined in a story
 * can attach to some host.
 */
const NodeHost = ({ getNode }: { getNode: () => React.ReactNode }): React.ReactElement => {
  return <>{getNode()}</>;
};

export default function repeatElement(
  getNode: () => React.ReactNode,
  copies: number,
): React.ReactElement {
  const nodes: React.ReactNode[] = Array.from({ length: copies }, (_, key) => (
    <React.Fragment key={key}>
      <NodeHost getNode={getNode} />}
    </React.Fragment>
  ));
  return <React.Fragment>{nodes}</React.Fragment>;
}
