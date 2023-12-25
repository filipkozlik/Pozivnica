import React, { Component } from "react";
import "./setup.css";

import TodoList from './list_of_guests';

// import { db } from './firebase_try.js'; 
// import { onValue, ref } from 'firebase/database';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            number_of_people: 1,
            addressing: '',
            addressing_name: '',
        }
    }
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
        
        <div className="label_description align_right add_guest_container_div">
            <label for="label_description">Tko je pozvan?</label>
        </div>
        <div className="description align_left input_field add_guest_container_div">
            <input required type="text" id="description" name="description" placeholder="Pero, Milka/Obitelj Kukuriku"
                onChange={e => this.setState({description: e.target.value})}></input>
        </div>
        <div className="label_number_of_people align_right add_guest_container_div">
            <label for="label_number_of_people">Očekivani broj ljudi:</label>
        </div>
        <div className="number_of_people align_left add_guest_container_div">
            <input required className="input_number" type="number" id="number_of_people" name="number_of_people" placeholder="2" min="1"
                onChange={e => this.setState({number_of_people: e.target.value})}></input>
        </div>
        <div className="label_addressing align_center add_guest_container_div">
            <label for="label_addressing">Kako osloviti?</label>
        </div>
        <div className="addressing align_right add_guest_container_div">
            <select className="addressing_modif" id="addressing" name="addressing"
                onChange={e => this.setState({addressing: e.target})}>
                <option value="label_dragi">Dragi</option>
                <option value="label_draga">Draga</option>
            </select>
        </div>
        <div className="addressing_name align_left input_field add_guest_container_div">
            <input required type="text" id="addressing_name" name="addressing_name" placeholder="Pero/Milka/obitelji Kukuriku"
                onChange={e => this.setState({addressing_name: e.target.value})}></input>
        </div>
        <div className="button_add align_center add_guest_container_div">
            <button
                className="button_style"
                onClick={() => {
                    const selector = document.getElementsByTagName("select")[0];
                    this.child.on_button_add(
                        document.getElementsByTagName("input")[0].value,
                        document.getElementsByTagName("input")[1].value,
                        selector.options[selector.selectedIndex].text,
                        document.getElementsByTagName("input")[2].value,); 
                }}>Dodaj
            </button>
        </div>
        <div id="todo_list" className="todo_list align_center">
            <TodoList ref={instance => { this.child = instance; }}/>
        </div>
      </div>
    );
  }
}

export default Setup;
