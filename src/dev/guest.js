import React from 'react';
import './guest.css';

import btn_copy from "../resources/images/btn_copy.png";
import btn_edit from "../resources/images/btn_edit.png";
import btn_delete from "../resources/images/btn_delete.png";

function TodoItem({ task, deleteTask, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    function animate_button(btn_id) {
        const element = document.getElementById(btn_id)

        element.classList.remove('btn_animation'); // reset animation
        void element.offsetWidth; // trigger reflow
        element.classList.add('btn_animation');
    }

    function get_guest_url() {
        // animate_button("btn_copy");
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");

        const base_url = "http://localhost:3000/Pozivnica";
        const wedding_query = "wedding=" + wedding;
        const invite_query = "invite=" + task.id;

        return base_url + "?" + wedding_query + "&" + invite_query;
    }
 
    return (
        <div className="guest_row_container">
          
          <div>
            <div className="btn_copy align_center">
                <img
                    id="btn_copy"
                    src={btn_copy}
                    className="btn"
                    onClick={() => {navigator.clipboard.writeText(get_guest_url())}}
                    // className="couple_about_photo_of_us couple_about_photo_animated couple_about_photo_bounce"
                />
            </div>
          </div>
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
          <div>
            <div className="btn_edit align_center">
                <img
                    src={btn_edit}
                    className="btn"
                    // className="couple_about_photo_of_us couple_about_photo_animated couple_about_photo_bounce"
                />
            </div>
          </div>
          <div>
            <div className="btn_delete align_center">
                <img
                    src={btn_delete}
                    className="btn"
                    // className="couple_about_photo_of_us couple_about_photo_animated couple_about_photo_bounce"
                />
            </div>
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