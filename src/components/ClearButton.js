import React from 'react';
import ConfettiGenerator from "confetti-js";
import swal from 'sweetalert';
import svg from '../assets/034-blast.svg';

class ClearButton extends React.Component {
  
  // Confetti animation
  confetti = () => { 
    var confettiSettings = { 
      target: 'my-canvas',
      respawn: true,
      rotate: true,
      clock: 40,
      max: 80,
      props: [ 
        'circle',
        'square',
        'triangle',
        'line',
        { type: 'svg', 'src': svg, 'size': 20, 'weight': 0.2 },
      ]
    };
    let confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(confetti.clear, 4000);
  }

  // Confirmation pop-up for 'Clear completed'
  delConfirm = () => {
    const todoList = this.props.todoList;
    const delComplete = this.props.delComplete;

    const completed = todoList.filter(todo => {
      return todo.isComplete;
    });

    if (completed.length > 0) {
      swal({
        text: "Are you sure you want to delete all completed tasks?",
        buttons: ["No", "Yes"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.confetti();
          delComplete();
        }
      });
    } else {
      swal({
        text: "There are no completed tasks to delete!",
      });
    }
  }
  
  render() {
    return(
      <div>
        <canvas id="my-canvas" width="auto" height="auto"></canvas>
        <button className="clearAll" onClick={this.delConfirm}>Clear completed</button>
      </div>
    )
  }
}

export default ClearButton;