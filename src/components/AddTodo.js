import React from 'react';

class AddTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    }
    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    this.textInput.current.focus();  // always return cursor to input field
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onSubmit = (e) => {
    const addTodo = this.props.addTodo;
    
    if (this.state.title) {  // only add todo if there's user input
      e.preventDefault();
      addTodo(this.state.title);
      this.setState({ title: '' });
    } else {
      e.preventDefault();
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}> 
        <h1><span role="img" aria-label="raisedhands">🙌</span> &nbsp; Today I will...</h1>
        <input 
          id="new-task" 
          ref={this.textInput}
          type="text" 
          autoComplete="off" 
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button className="addTask">+</button>
      </form>
    );
  }
}

export default AddTodo;