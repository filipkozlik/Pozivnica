import React from 'react';
import './guest.css';

import btn_copy from "../resources/images/btn_copy.png";
import btn_delete from "../resources/images/btn_delete.png";

function Guest({ task, deleteTask }) {

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

        // const base_url = "http://localhost:3000/Pozivnica";
        const base_url = "https://filipkozlik.github.io/Pozivnica";
        const wedding_query = "wedding=" + wedding;
        const invite_query = "invite=" + task.id;

        return base_url + "?" + wedding_query + "&" + invite_query;
    }
 
    return (
        <div className="div_guest_row_container">

            <div className="div_label_description align_right">
                <label for="label_description">Tko?</label>
            </div>
            <div className="div_description align_left input_field">
                <input readonly value={task.description} type="text" id="description" name="description"></input>
            </div>

            <div className="div_label_number_of_adults align_right">
                <label for="label_number_of_adults">Odrasli:</label>
            </div>
            <div className="div_number_of_adults align_left input_field">
                <input readonly value={task.number_of_adults} type="text" id="number_of_adults" name="number_of_adults"></input>
            </div>

            <div className="div_label_number_of_kids align_right">
                <label for="label_number_of_kids">Djeca:</label>
            </div>
            <div className="div_number_of_kids align_left input_field">
                <input readonly value={task.number_of_kids} type="text" id="number_of_kids" name="number_of_kids"></input>
            </div>

            <div className="div_label_addressing align_right">
                <label for="label_addressing">Kako osloviti?</label>
            </div>
            <div className="div_addressing_name align_left input_field">
                <input readonly value={task.addressing_name} type="text" id="addressing_name" name="addressing_name"></input>
            </div>
          
            <div>
                <div className="div_btn_copy align_center">
                    <img
                        id="btn_copy"
                        src={btn_copy}
                        className="btn"
                        onClick={() => {navigator.clipboard.writeText(get_guest_url())}}
                    />
                </div>
            </div>
            <div>
                <div className="div_btn_delete align_center">
                    <img
                        src={btn_delete}
                        className="btn"
                        onClick={() => { deleteTask(task.id); }}
                    />
                </div>
            </div>
        </div>
    );
}
export default Guest;