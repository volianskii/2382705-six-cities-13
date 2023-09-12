import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { AuthorizationStatus } from '../../types/authorization';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const emailText = 'E-mail';
    const passwordText = 'Password';
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      }
    };
    const { withStoreComponent } = withStore(<Login />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button', {
      name: /sign in/i
    });

    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render correctly when user enters login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@login.ru';
    const expectedPasswordValue = '1qwerty';
    const { withStoreComponent } = withStore(<Login />, {
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );
    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();

  });
});
