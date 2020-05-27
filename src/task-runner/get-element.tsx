import React from 'react';

export default function getElement(getNode: () => React.ReactNode): () => React.ReactElement {
  return () => <React.Fragment>{getNode()}</React.Fragment>;
}
