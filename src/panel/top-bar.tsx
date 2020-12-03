import { Button, Form, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import React, { ChangeEvent } from 'react';
import useRequiredContext from '../use-required-context';
import ServiceContext from './service-context';
import { useService } from '@xstate/react';
import { RunContext } from './machine';
import { Nullable } from '../types';
import { pluraliseCopies, pluraliseSamples } from '../util/pluralise';
import nextEventsInclude from './next-events-include';
import * as selectors from '../selectors';
import { readFile } from './file-system';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Message = styled.small`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 1;
  flex-grow: 1;
`;

const Segment = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: var(--halfGrid) !important;
    flex-shrink: 0;
  }
`;

const HiddenAnchor = styled.a`
  display: none;
`;

const FileButtons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  > * {
    margin: var(--halfGrid) !important;
    flex-shrink: 0;
  }
`;

// Setting a width so we have a consistent wrap point
// Setting a min-width so the message can collapse in tight scenarios
const CollapseSegment = styled(Segment)`
  width: 400px;
  min-width: 0;
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

  const enabled: BooleanMap = {
    start: nextEventsInclude('START_ALL', state.nextEvents),
    change: nextEventsInclude('SET_VALUES', state.nextEvents) && pinned == null,
    pin: nextEventsInclude('PIN', state.nextEvents) && current.results != null,
    unpin: nextEventsInclude('UNPIN', state.nextEvents) && current.results != null,
  };

  return (
    <Container>
      <Segment>
        {
          // @ts-ignore
          <Button
            primary
            small
            onClick={() => send({ type: 'START_ALL' })}
            disabled={!enabled.start}
            id={selectors.startAllButtonId}
          >
            START ALL
          </Button>
        }
        {
          // @ts-ignore
          <Form.Select
            id={selectors.copySelectId}
            disabled={!enabled.change}
            value={current.copies}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                samples: current.samples,
                copies: Number(event.target.value),
              };
              send('SET_VALUES', values);
            }}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size} {pluraliseCopies(size)}
              </option>
            ))}
          </Form.Select>
        }
        {
          // @ts-ignore
          <Form.Select
            id={selectors.sampleSelectId}
            disabled={!enabled.change}
            value={current.samples}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                copies: current.copies,
                samples: Number(event.target.value),
              };
              send('SET_VALUES', values);
            }}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size} {pluraliseSamples(size)}
              </option>
            ))}
          </Form.Select>
        }
      </Segment>
      <CollapseSegment>
        {
          // @ts-ignore
          <Button
            id={selectors.pinButtonId}
            secondary
            small
            outline
            disabled={pinned ? !enabled.unpin : !enabled.pin}
            onClick={() => send({ type: pinned ? 'UNPIN' : 'PIN' })}
          >
            <Icons icon={pinned ? 'unlock' : 'lock'} />
            {pinned ? 'Unpin baseline result' : 'Pin result as baseline'}
          </Button>
        }
        <Message>{state.context.message}</Message>
      </CollapseSegment>
      <FileButtons>
        {
          // @ts-ignore
          <Button
            id={selectors.saveButtonId}
            secondary
            small
            outline
            disabled={current.results == null}
            onClick={() => send({ type: 'SAVE' })}
          >
            <Icons icon="download" />
            Save result
          </Button>
        }
        {
          // @ts-ignore
          <Button
            secondary
            small
            onClick={() => {
              document.getElementById(selectors.loadButtonId)?.click();
            }}
          >
            <Icons icon="upload" />
            Load result
          </Button>
        }
        <Form.Input
          style={{ display: 'none' }}
          id={selectors.loadButtonId}
          type="file"
          accept=".json"
          onChange={(e) => {
            readFile(e, (results, storyName) =>
              send('LOAD_FROM_FILE', { pinned: results, storyName }),
            );
          }}
        />
      </FileButtons>
      <HiddenAnchor id={selectors.hiddenFileAnchorId} />
    </Container>
  );
}
