import React from 'react';
import RouteData from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import ResetPassorwd from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedToast = jest.fn();
let mockedToken: jest.SpyInstance;

const mockLocation = {
  withToken: {
    pathname: '',
    hash: '',
    search: '?token=new-token',
    state: '',
  },

  withoutToken: {
    pathname: '',
    hash: '',
    search: '',
    state: '',
  },
};

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      location: () => ({
        search: '',
      }),
    }),
  };
});

jest.mock('../../hooks/Toast', () => {
  return {
    useToast: () => ({
      addToast: mockedToast,
    }),
  };
});

jest.mock('../../services/api.ts', () => {
  return {
    post: jest.fn(),
  };
});

describe('ResetPassowrod Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedToast.mockClear();
    mockedToken = jest.spyOn(RouteData, 'useLocation');
  });

  it('should be able to reset password', async () => {
    jest
      .spyOn(RouteData, 'useLocation')
      .mockReturnValue(mockLocation.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassorwd />);

    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456789' },
    });
    fireEvent.change(passwordField, { target: { value: '123456789' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should be able to reset password without token', async () => {
    mockedToken.mockReturnValue(mockLocation.withoutToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassorwd />);

    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456789' },
    });
    fireEvent.change(passwordField, { target: { value: '123456789' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should be able to reset password with password not informad', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassorwd />);

    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456789' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
