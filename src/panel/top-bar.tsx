import { Button, Form, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import React, { ChangeEvent } from 'react';
import useRequiredContext from '../use-required-context';
import ServiceContext from './service-context';
import { useService } from '@xstate/react';
import { RunContext } from './machine';
import { Nullable } from '../types';
import { pluraliseCopies, pluraliseSamples } from '../util/pluralise';

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`
  margin: var(--halfGrid);
`;

type BooleanMap = {
  [key: string]: boolean;
};

export default function Topbar() {
  const service = useRequiredContext(ServiceContext);
  const [state, send] = useService(service);
  const current: RunContext = state.context.current;
  const pinned: Nullable<RunContext> = state.context.pinned;
  const sizes: number[] = state.context.sizes;

  const disabled: BooleanMap = {
    start: state.matches('running'),
    change: state.matches('running') || Boolean(pinned),
    pin: state.matches('running') || current.results == null,
  };

  return (
    <Container>
      <Item>
        {
          // @ts-ignore
          <Button
            primary
            small
            onClick={() => send({ type: 'START_ALL' })}
            disabled={disabled.start}
          >
            START ALL
          </Button>
        }
      </Item>
      <Item>
        {
          // @ts-ignore
          <Form.Select
            disabled={disabled.change}
            value={current.copies}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                samples: current.samples,
                copies: Number(event.target.value),
              };
              send('SET_VALUES', values);
            }}
          >
            {sizes.map((size: number) => (
              <option key={size} value={size}>
                {size} {pluraliseCopies(size)}
              </option>
            ))}
          </Form.Select>
        }
      </Item>
      <Item>
        {
          // @ts-ignore
          <Form.Select
            disabled={disabled.change}
            value={current.samples}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                copies: current.copies,
                samples: Number(event.target.value),
              };
              send('SET_VALUES', values);
            }}
          >
            >
            {sizes.map((size: number) => (
              <option key={size} value={size}>
                {size} {pluraliseSamples(size)}
              </option>
            ))}
          </Form.Select>
        }
      </Item>
      <Item>
        {
          // @ts-ignore
          <Button
            secondary
            small
            outline
            disabled={disabled.pin}
            onClick={() => send({ type: pinned ? 'UNPIN' : 'PIN' })}
          >
            <Icons icon={pinned ? 'unlock' : 'lock'} />
            {pinned ? 'Unpin baseline result' : 'Pin result as baseline'}
          </Button>
        }
      </Item>
    </Container>
  );
}
