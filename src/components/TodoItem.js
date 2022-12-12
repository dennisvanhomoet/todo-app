import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.item.text,
    };
    this.handleInput = this.handleInput.bind(this);
  }
  static propTypes = {
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func,
    saveTodo: PropTypes.func,
  };

  handleInput(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <li data-testid="todo-item">
        {this.props.item.state === 'read' ? (
          <div className="flex items-center space-x-2 p-4 w-full justify-between">
            <div className="overflow-ellipsis">{this.props.item.text}</div>
            <div className="space-x-2">
              <button
                onClick={() => this.props.editTodo()}
                className="btn btn-success"
              >
                Edit
              </button>
              <button
                onClick={() => this.props.deleteTodo()}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 p-4 w-full justify-between">
            <input
              name='inputValue'
              onChange={this.handleInput}
              className="input input-bordered w-full"
              type="text"
              placeholder="What do you have todo?"
              defaultValue={this.props.item.text}
              autoFocus
            />
            <button
              onClick={() => this.props.saveTodo(this.state.inputValue)}
              className="btn btn-info"
            >
              save
            </button>
          </div>
        )}
      </li>
    );
  }
}

export default TodoItem;
