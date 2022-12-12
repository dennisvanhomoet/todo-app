import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';

const fakeTodoRead = {
  text: 'buy milk',
  state: 'read',
};

const fakeTodoEdit = () => ({
  text: 'buy milk',
  state: 'edit',
});

test('renders todo item with status read ', () => {
  render(<TodoItem item={fakeTodoRead} />);
  const headerElement = screen.getByTestId('todo-item');
  expect(headerElement).toBeInTheDocument();
  const textElement = screen.getByText('buy milk');
  expect(textElement).toBeInTheDocument();
  const editButtonElement = screen.getByRole('button', { name: /edit/i });
  expect(editButtonElement).toBeInTheDocument();
  const deleteButtonElement = screen.getByRole('button', { name: /delete/i });
  expect(deleteButtonElement).toBeInTheDocument();
});

test('renders todo item with status edit ', () => {
  render(<TodoItem item={fakeTodoEdit()} />);
  const headerElement = screen.getByTestId('todo-item');
  expect(headerElement).toBeInTheDocument();
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveValue('buy milk');
  const saveButtonElement = screen.getByRole('button', { name: /save/i });
  expect(saveButtonElement).toBeInTheDocument();
});
