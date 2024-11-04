import { Button, Form } from '@storybook/components';
import { DownloadIcon, LockIcon, UnlockIcon, UploadIcon } from '@storybook/icons';
import { styled } from '@storybook/theming';
import React, { ChangeEvent } from 'react';
import useRequiredContext from '../use-required-context';
import ServiceContext from './service-context';
import { useActor } from '@xstate/react';
import { RunContext } from './machine';
import { Nullable } from '../types';
import { pluraliseCopies, pluraliseSamples } from '../util/pluralise';
import nextEventsInclude from './next-events-include';
import * as selectors from '../selectors';
import { readFile } from './file-system';

const TABLET_BREAKPOINT = 768;

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

const MetaSettings = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const ResponsiveText = styled.span`
  @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
    display: none;
  }
`;

// Setting a width so we have a consistent wrap point
// Setting a min-width so the message can collapse in tight scenarios
const CollapseSegment = styled.div`
  margin: var(--halfGrid);
  align-items: center;
  display: grid;
  grid-template-columns: min-content minmax(100px, auto);
  gap: var(--halfGrid);
`;

type BooleanMap = {
  [key: string]: boolean;
};

export default function Topbar() {
  const service = useRequiredContext(ServiceContext);
  const [state, send] = useActor(service);
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
          <Button
            // @ts-ignore
            css={{
              textTransform: 'uppercase',
            }}
            variant="solid"
            size="small"
            onClick={() => send({ type: 'START_ALL' })}
            disabled={!enabled.start}
            id={selectors.startAllButtonId}
          >
            Start all
          </Button>
        }
        {
          <Form.Select
            id={selectors.copySelectId}
            disabled={!enabled.change}
            value={current.copies}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                samples: current.samples,
                copies: Number(event.target.value),
              };
              send({ type: 'SET_VALUES', ...values });
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
          <Form.Select
            id={selectors.sampleSelectId}
            disabled={!enabled.change}
            value={current.samples}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const values = {
                copies: current.copies,
                samples: Number(event.target.value),
              };
              send({ type: 'SET_VALUES', ...values });
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
      <MetaSettings>
        <CollapseSegment>
          {
            <Button
              id={selectors.pinButtonId}
              variant={!pinned ? 'outline' : undefined}
              size="small"
              disabled={pinned ? !enabled.unpin : !enabled.pin}
              onClick={() => send({ type: pinned ? 'UNPIN' : 'PIN' })}
            >
              {pinned ? <LockIcon aria-label="lock" /> : <UnlockIcon aria-label="unlock" />}
              <ResponsiveText>{pinned ? 'Unpin baseline' : 'Pin as baseline'}</ResponsiveText>
            </Button>
          }
          <Message>{state.context.message}</Message>
        </CollapseSegment>
        <FileButtons>
          {
            <Button
              id={selectors.saveButtonId}
              size="small"
              variant="outline"
              disabled={current.results == null}
              onClick={() => send({ type: 'SAVE' })}
            >
              <DownloadIcon aria-label="save" />
              <ResponsiveText>Save result</ResponsiveText>
            </Button>
          }
          {
            <Button
              size="small"
              variant="outline"
              onClick={() => {
                document.getElementById(selectors.loadButtonId)?.click();
              }}
            >
              <UploadIcon aria-label="load" />
              <ResponsiveText>Load result</ResponsiveText>
            </Button>
          }
          <Form.Input
            style={{ display: 'none' }}
            id={selectors.loadButtonId}
            type="file"
            accept=".json"
            onChange={(e: any) => {
              readFile(e, (results, storyName) =>
                send({ type: 'LOAD_FROM_FILE', pinned: results, storyName }),
              );
            }}
          />
        </FileButtons>
        <HiddenAnchor id={selectors.hiddenFileAnchorId} />
      </MetaSettings>
    </Container>
  );
}
