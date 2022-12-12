import PropTypes from "prop-types";

const Header = props => (
    <header className="flex justify-between items-center bg-blue-400 p-4
    ">
     <h1 data-testid="header">Todo App</h1>
     <button  onClick={() => props.addTodo()} className="btn btn-primary">
        Add TODO
     </button>
    </header>
  );

Header.propTypes = {
    addTodo: PropTypes.func
  };

export default Header;