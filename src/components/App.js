import React from 'react';
import '../App.css';
import Header from './Header';
import TodoItem from './TodoItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      storageId: "shell-todos"
    };
  }

  componentDidMount() {
    // Check if we have todos in localStorage
    const localStorageRef = localStorage.getItem(this.state.storageId);
    if (localStorageRef) {
      this.setState({ todos: JSON.parse(localStorageRef) });
    }
  }

  componentDidUpdate() {
    // Save todos to localStorage
    localStorage.setItem(this.state.storageId, JSON.stringify(this.state.todos));
  }


  addTodo = () => {
    const id = Date.now().toString().slice(-6);
    const newTodo = {id,  text: '', state: 'edit' };
    this.setState({ todos: [...this.state.todos, newTodo] },
      () => { this.editTodo(id) });
  };

  editTodo = (id) => {
    const newTodos = [...this.state.todos];
    newTodos.forEach((todo) => (todo.state = 'read'));
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].state = 'edit';
    this.setState({ todos: newTodos });
  };

  saveTodo = (id, input) => {
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].state = 'read';
    newTodos[index].text = input;
    this.setState({ todos: newTodos });
  };

  deleteTodo = (id) => {
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div data-testid="app-root">
        <Header addTodo={this.addTodo} />
        <ul>
          {this.state.todos
            .slice(0)
            .reverse()
            .map((item, index) => (
              <TodoItem
                item={item}
                index={index}
                key={`todo-${item.id}`}
                editTodo={() => this.editTodo(item.id)}
                saveTodo={(input) => this.saveTodo(item.id, input)}
                deleteTodo={() => this.deleteTodo(item.id)}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
