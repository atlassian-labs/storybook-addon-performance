import { styled } from '@storybook/theming';

export const Section = styled.div`
  background-color: ${(props) => props.theme.background.content};
  padding: var(--grid);
  padding-top: 0;

  > * {
    margin-top: var(--grid);
  }

  &:last-of-type {
    border-bottom-left-radius: var(--result-border-radius);
    border-bottom-right-radius: var(--result-border-radius);
  }
`;

export const Heading = styled.h4`
  font-weight: bold;
`;

export const Content = styled.div``;

// @ts-ignore
export const Note = styled.div`
  padding: calc(var(--grid) / 2);
  background-color: ${(props) => props.theme.background.hoverable};
  border-radius: var(--result-border-radius);
  font-size: small;

  &::before {
    margin-right: 1ch;
    content: 'ℹ️';
  }
`;

export const ResultValue = styled.code`
  /* font-family: 'Courier'; */
`;

export const ResultScale = styled.code`
  /* slightly smaller margin that other elements */
  margin-left: var(--halfGrid);
`;

export const ValueLozenge = styled.code<{
  hasWarningIcon?: boolean;
  type: 'positive' | 'negative' | 'warning' | 'info' | 'faint' | 'raw';
  width?: 'fill' | 'inherit';
}>`
  ${({ hasWarningIcon = true }) =>
    !hasWarningIcon &&
    `&:before {
      content: '⚠️';
      margin-right: 1ch;
    }`};
  padding: calc(var(--grid) / 2) var(--grid);
  border-radius: var(--result-border-radius);
  color: ${(props) => props.theme.color.light};
  font-weight: bold;
  font-size: small;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'positive':
        return theme.color.positive;
      case 'negative':
        return theme.color.negative;
      case 'faint':
        return theme.color.medium;
      case 'warning':
        return theme.color.warning;
      case 'info':
        return theme.color.seafoam;
      default:
        return theme.color.purple;
    }
  }};
`;

export const Table = styled.table`
  width: 100%;
`;

export const TitleCell = styled.td``;

export const ValueCell = styled.td`
  text-align: right;
`;
