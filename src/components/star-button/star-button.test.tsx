import React from 'react';
import StarButton from './star-button';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import StarButtonDetails from '../../constants/star-button-details';


describe('Component: StarButton', () => {
  it('User shouldn\'t be able to set rating when the form is disabled', async () => {
    const testOnChangeHandler = vi.fn();
    render(<StarButton details={StarButtonDetails[0]} onChangeHandler={testOnChangeHandler} isChecked={false} isFormDisabled />);
    await userEvent.click(screen.getByDisplayValue('5'));
    expect(testOnChangeHandler).not.toBeCalled();
  });

  it('User should be able to set rating when the form is not disabled', async () => {
    const testOnChangeHandler = vi.fn();
    render(<StarButton details={StarButtonDetails[0]} onChangeHandler={testOnChangeHandler} isChecked={false} isFormDisabled={false} />);
    await userEvent.click(screen.getByDisplayValue('5'));
    expect(testOnChangeHandler).toBeCalledTimes(1);
  });
});
