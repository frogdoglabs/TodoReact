import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    const todoList = this.props.todoList;
    
    // Separate todos into completed and incompleted, so they can render under their respective headers
    const incompletedList = [];
    const completedList = [];

    todoList.forEach(todo => {
      const item = (
        <Todo 
          todo={todo}
          key={todo.id} 
          toggleComplete={this.props.toggleComplete} 
          delTodo={this.props.delTodo}
          editTodo={this.props.editTodo}
        />
      )
      todo.isComplete ? completedList.push(item) : incompletedList.push(item);
    })

    return (
      <div>
        <h3 id="incomplete-tasks">TODO <span role="img" aria-label="runningman">🏃‍♂️</span></h3>
        {incompletedList}
        <h3 id="completed-tasks">COMPLETED <span role="img" aria-label="party">🎉</span></h3>
        {completedList}
      </div>
    )
  }
}

export default TodoList;