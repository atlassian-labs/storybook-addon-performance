// Note: Storybook currently has a but where builds will fail with type errors because of missing types
// in @types/react-syntax-highlighter. This type file provides the missing types.
// Issue detail: https://github.com/storybookjs/storybook/issues/11684

declare module 'react-syntax-highlighter/dist/cjs/create-element' {
  import React from 'react';

  export type SyntaxHighlightNode =
    | (TextNode & Partial<Record<keyof TagNode<any>, never>>)
    | (TagNode<any> & Partial<Record<keyof TextNode, never>>);

  export interface TextNode {
    type: 'text';
    value: string;
  }

  export interface TagNode<T extends React.ElementType> {
    tagName: T;
    properties: React.ComponentProps<T>;
  }

  export interface CreateElementProps {
    node: SyntaxHighlightNode;
    stylesheet: import('react-syntax-highlighter').SyntaxHighlighterProps['customStyle'];
    style?: React.CSSProperties;
    useInlineStyles?: boolean;
    key: string | number;
  }

  export default function createElement(props: CreateElementProps): string | JSX.Element;
}
