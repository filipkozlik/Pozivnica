import React, { Component } from "react";
import "./setup.css";

import TodoList from './list_of_guests';

// import { db } from './firebase_try.js'; 
// import { onValue, ref } from 'firebase/database';

class Setup extends Component {
//   componentWillMount() {
//     let search = window.location.search;
//     let params = new URLSearchParams(search);
//     let wedding = params.get("wedding");
//     this.setState({
//       ready: false,
//     });
    
//     const query = ref(db, "/" + wedding + "/info");
//     onValue(query, (snapshot) => {
//       if(snapshot.exists()) {
//         const info = snapshot.val();
//         this.setState({
//           wedding_title: info["contact"]["bride"]["name"] + " & " + info["contact"]["groom"]["name"],
//           wedding_date: info["date"],
//         });
//       }
//     });
//   }

  render() {
    return (
      <div className="add_guest_container">
        
        <div className="label_description align_right">
            <label for="label_description">Tko je pozvan?</label>
        </div>
        <div className="description align_left input_field">
            <input type="text" id="description" name="description" placeholder="Pero, Milka/Obitelj Kukuriku"></input>
        </div>
        <div className="label_number_of_people align_right">
            <label for="label_number_of_people">Očekivani broj ljudi:</label>
        </div>
        <div className="number_of_people align_left">
            <input className="input_number" type="number" id="number_of_people" name="number_of_people" placeholder="2" min="1"></input>
        </div>
        <div className="label_addressing align_center">
            <label for="label_addressing">Kako osloviti?</label>
        </div>
        <div className="addressing align_right">
            <select className="addressing_modif" id="addressing" name="addressing">
                <option value="label_dragi">Dragi</option>
                <option value="label_draga">Draga</option>
            </select>
        </div>
        <div className="addressing_name align_left input_field">
            <input type="text" id="addressing_name" name="addressing_name" placeholder="Pero/Milka/obitelji Kukuriku"></input>
        </div>
        <div className="button_add align_center">
            <button
                className="button_style"
                onClick={() => { this.child.addTask("Dinamo ZG"); }}>Dodaj
            </button>
        </div>
        <div id="todo_list" className="todo_list"><TodoList ref={instance => { this.child = instance; }}/></div>
      </div>
    );
  }
}

export default Setup;
