/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
  useDispatch: () => () => {},
  useSelector: () => null,
}));

jest.mock('../src/store', () => ({
  store: {
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => () => {},
  },
}));

test('renders correctly', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toBeTruthy();
});
