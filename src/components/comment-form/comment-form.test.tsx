import CommentForm from './comment-form';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: CommentForm', () => {

  it('should render correctly', () => {
    const testId = 'testId';
    const { withStoreComponent } = withStore(<CommentForm id={testId}/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('commentComponent')).toBeInTheDocument();
  });

  it('"Submit" button should be disabled by default', () => {
    const testId = 'testId';
    const { withStoreComponent } = withStore(<CommentForm id={testId}/>, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show a warning message when user types less than 300 characters in the textarea', async () => {
    const testId = 'testId';
    const { withStoreComponent } = withStore(<CommentForm id={testId}/>, makeFakeStore());
    const testSmallMessage = 'Test small length message';
    render(withStoreComponent);

    await userEvent.type(screen.getByTestId('textareaElement'), testSmallMessage);
    expect(screen.getByTestId('warningMessage')).toBeInTheDocument();
  });

  it('"Submit" button should not be disabled when user types between 50 and 300 characters and sets the rating', async () => {
    const testId = 'testId';
    const { withStoreComponent } = withStore(<CommentForm id={testId}/>, makeFakeStore());
    const testSuitableMessage = 'Test suitable length message 111111111111111111111111111111';
    render(withStoreComponent);

    await userEvent.type(screen.getByTestId('textareaElement'), testSuitableMessage);
    await userEvent.click(screen.getByDisplayValue('3'));

    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
