import React from 'react';
import './guest.css';

function TodoItem({ task, deleteTask, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(task.id);
    }
 
    return (
        <div className="guest_row_container">
          
          <div className="label_description align_right">
              <label for="label_description">Tko?</label>
          </div>
          <div className="description align_left input_field">
              <input readonly value={task.description} type="text" id="description" name="description"></input>
          </div>
          <div className="label_number_of_people align_right">
              <label for="label_number_of_people">Broj ljudi:</label>
          </div>
          <div className="number_of_people align_left input_field">
              <input readonly value={task.number_of_people} type="text" id="number_of_people" name="number_of_people"></input>
          </div>
          <div className="label_addressing align_right">
              <label for="label_addressing">Kako osloviti?</label>
          </div>
          <div className="addressing_name align_left input_field">
              <input readonly value={task.addressing_name} type="text" id="addressing_name" name="addressing_name"></input>
          </div>
        </div>
        // <div className="todo-item">
        //     <input 
        //         type="checkbox"
        //         checked={task.completed}
        //         onChange={handleChange}/>
        //     <p>{task.text}</p>
        //     <button onClick={() => deleteTask(task.id)}>X</button>
        // </div>
    );
}
export default TodoItem;