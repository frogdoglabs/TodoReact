import React from 'react';

class Todo extends React.Component {
  
  // If user edits the todo, allow Enter key to submit it
  handleKeypress = (id, e) => {
    if (e.which === 13) {
      this.props.editTodo(id, e);
    }
  }

  render() {
    const {id, title, isComplete } = this.props.todo;
    const toggleComplete = this.props.toggleComplete;
    const delTodo = this.props.delTodo;
    
    
    const style = {
      textDecoration: isComplete ? 'line-through' : 'none', 
      color: isComplete ? '#888' : '#000'
    }

    return (
     <div>
      <li>
        <input
          type="checkbox"
          className="checkbox" 
          checked={isComplete}
          onChange={() => toggleComplete(id)}
        />
        <label
          className="label" 
          style={style}  
          onBlur={(e) => this.props.editTodo(id, e)}
          onKeyDown={(e) => this.handleKeypress(id, e)}
          contentEditable="true" 
          suppressContentEditableWarning={true}
          >{title}
        </label>
        <button className="delete" onClick={() => delTodo(id)} >&ndash; </button>
      </li>
     </div>
    )
  }
}

export default Todo;

