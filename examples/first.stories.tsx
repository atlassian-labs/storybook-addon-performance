import React, { useState } from 'react';
import { waitFor, getByText } from '@testing-library/dom';
import { TimedTaskControls, RunTimedTaskArgs } from '../src/types'
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';


export default {
  title: 'Buttons',
};

const FlippingButton = () => {

  const [buttonText, setButtonText] = useState("hello world");

  const onClick = () => {
    setButtonText((buttonText === buttonText.toUpperCase()) ?
      buttonText.toLowerCase() : buttonText.toUpperCase());
    console.log(buttonText);
  }

  return (<button id="1" onClick={onClick}>{buttonText}</button>);
};

export const button = () => <FlippingButton />

export const button2 = () => <button>Hello other world</button>;

interface State {
  isOpen: boolean;
}
class DefaultModal extends React.PureComponent<{}, State> {
  state: State = { isOpen: false };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  secondaryAction = ({ target }: any) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        <ModalTransition>
          {isOpen && (
            <Modal actions={actions} onClose={this.close} heading="Modal Title">
              some great text
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}

export const modal = () => <DefaultModal />


button.story = {
  parameters: {
    performance: {
      interactions: [
        {
          name: 'interaction_test',
          description: 'An initial test',
          run: async ({ getElement, controls, container }: RunTimedTaskArgs): Promise<void> => {

            setTimeout(async () => {
              getByText(container, 'hello world').click();
              await waitFor(() =>
                getByText(container, 'HELLO WORLD')
              )
              getByText(container, 'HELLO WORLD').click();
              await waitFor(() =>
                getByText(container, 'hello world')
              )
            })
          }
        },
        {
          name: 'test 2',
          description: 'A follow-up test',
          run: async (): Promise<void> => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              });
            });
          },
        }
      ]
    },
  },
};

modal.story = {
  parameters: {
    performance: {
      interactions: [
        {
          name: 'interaction_test',
          description: 'An initial test',
          run: async ({ getElement, controls, container }: RunTimedTaskArgs): Promise<void> => {
            await controls.time(async () => {
              getByText(container, 'Open Modal').click();
              await new Promise(r => setTimeout(r, 100));
              await waitFor(() =>
                getByText(container, 'Close').click()
              )
            })
          }
        },
      ]
    },
  },
};
