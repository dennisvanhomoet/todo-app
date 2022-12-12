import { render, screen } from '@testing-library/react';
import Header from './header';

test('renders header', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});
