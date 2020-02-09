import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import ClearButton from './components/ClearButton';
import { v4 as uuid } from 'uuid';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    }
  }

 // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title,
      isComplete: false
    }
    
    this.setState(
      { todoList: [...this.state.todoList, newTodo] },
      this.persistData // save to localstorage
    );
  }

  // Toggle Complete
  toggleComplete = (id) => {
    const updatedList = this.state.todoList.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    })
    this.setState({ todoList: updatedList }, this.persistData);
  }

  // Delete Todo
  delTodo = (id) => {
    const updatedList = this.state.todoList.filter(todo => {
      return todo.id !== id;
    });
    this.setState({ todoList: updatedList }, this.persistData);
  }

  // Delete All Completed Todos
  delComplete = () => {
    const updatedList = this.state.todoList.filter(todo => {
      return !todo.isComplete;
    });
    this.setState({ todoList: updatedList }, this.persistData);
  }

  // Edit Todo
  editTodo = (id, e) => { 
    const newTitle = e.target.textContent;
    const updatedList = this.state.todoList.map(todo => {
      if (todo.id === id) {
        todo.title = newTitle;
      }
      return todo;
    });
    this.setState({ todoList: updatedList }, this.persistData);
  }

  // Save data to local storage
  persistData = () => {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList)); // transform to string
  }

  // Read data from local storage
  readStorage = () => {
    const storage = JSON.parse(localStorage.getItem('todoList')); // revert from string
    if (storage) {
      this.setState({ todoList: storage });
    }
  }

  componentDidMount() {
    this.readStorage();
  }

  render() {
    return (
      <div className="container">
        <AddTodo 
          addTodo={this.addTodo}
          persistData={this.persistData}
        />
        <TodoList
          todoList={this.state.todoList} 
          toggleComplete={this.toggleComplete}
          delTodo={this.delTodo} 
          editTodo={this.editTodo}
        />
        <ClearButton 
          todoList={this.state.todoList} 
          delComplete={this.delComplete} 
        />
      </div>
    )
  }
}

export default App;