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
` as any;

export const Heading = styled.h4`
  font-weight: bold;
` as any;

export const Content = styled.div`` as any;

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
` as any;

export const ResultValue = styled.code`
  /* font-family: 'Courier'; */
` as any;

export const ResultScale = styled.code`
  /* slightly smaller margin that other elements */
  margin-left: var(--halfGrid);
` as any;

export const ValueLozenge = styled.code<{
  type: 'positive' | 'negative' | 'warning' | 'info' | 'faint' | 'raw';
  width?: 'fill' | 'inherit';
}>`
  padding: calc(var(--grid) / 2) var(--grid);
  border-radius: var(--result-border-radius);
  color: ${(props) => props.theme.color.light};
  font-weight: bold;
  font-size: small;
  background-color: ${({ type, theme }) =>
    type === 'positive'
      ? theme.color.positive
      : type === 'negative'
      ? theme.color.negative
      : type === 'warning'
      ? theme.color.warning
      : type === 'info'
      ? theme.color.seafoam
      : type === 'faint'
      ? theme.color.medium
      : theme.color.purple};
` as any;

export const Table = styled.table`
  width: 100%;
` as any;

export const TitleCell = styled.td`` as any;

export const ValueCell = styled.td`
  text-align: right;
` as any;
