import React, { Component } from "react";
import "./setup.css";

import TodoList from './list_of_guests';
import DialogGuest from "./dialog_add_guest.js";

import btn_add from "../resources/images/btn_add.png";
import btn_save from "../resources/images/btn_finish.png";
import button_cancel from "../resources/images/btn_delete.png";

// import { db } from './firebase_try.js'; 
// import { onValue, ref } from 'firebase/database';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            number_of_adults: 1,
            number_of_kids: 1,
            addressing: '',
            addressing_name: '',
            editing_guest: false,
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

    add_user_to_db() {
        const selector = document.getElementsByTagName("select")[0];
        if (this.state.editing_guest) {
            this.child_guest.on_button_edit(
                document.getElementsByTagName("input")[0].value,
                document.getElementsByTagName("input")[1].value,
                document.getElementsByTagName("input")[2].value,
                selector.options[selector.selectedIndex].text,
                document.getElementsByTagName("input")[3].value
            ); 
        } else {
            this.child_guest.on_button_add(
                document.getElementsByTagName("input")[0].value,
                document.getElementsByTagName("input")[1].value,
                document.getElementsByTagName("input")[2].value,
                selector.options[selector.selectedIndex].text,
                document.getElementsByTagName("input")[3].value
            );
        }
    }

    edit_guest(guest_data) {
        this.setState({
            editing_guest: true,
        });
        var dialog = document.getElementById("dialog_user_add");
        dialog.showModal();
        var dialog_inner = dialog.children[0].children[0].children[0];
        dialog_inner.children[1].children[0].value = guest_data.description;
        dialog_inner.children[3].children[0].value = guest_data.number_of_adults;
        dialog_inner.children[5].children[0].value = guest_data.number_of_kids;
        dialog_inner.children[7].children[0].selectedIndex = guest_data.addressing === "Draga" ? 1 : 0;
        dialog_inner.children[8].children[0].value = guest_data.addressing_name;
    }

    open_dialog() {
        this.setState({
            editing_guest: false,
        });
        var dialog = document.getElementById("dialog_user_add");
        dialog.showModal();
    }

    close_dialog() {
        var dialog = document.getElementById("dialog_user_add");
        dialog.close();
    }

  render() {
    return (
        <div>
            <dialog id="dialog_user_add" className="dialog_user_add">
                <div className="container_user_add">
                    <div id="dialog_div" className="align_center">
                        <DialogGuest ref={instance => { this.child_dialog = instance; }}/>
                    </div>
                    <div className="dialog_user_add_buttons">
                        <div className="button_save align_center add_guest_container_div">
                            <img
                                id="button_save"
                                src={btn_save}
                                className="btn"
                                onClick={() => { this.add_user_to_db(); this.close_dialog(); }}
                            />
                        </div>
                        <div className="button_cancel align_center add_guest_container_div">
                            <img
                                id="button_cancel"
                                src={button_cancel}
                                className="btn"
                                onClick={() => { this.close_dialog(); }}
                            />
                        </div>
                    </div>
                </div>
            </dialog>
            <div className="add_guest_container">
                <div className="button_add align_center add_guest_container_div">
                    <img
                        id="btn_add"
                        src={btn_add}
                        className="btn"
                        onClick={() => { this.open_dialog(); }}
                    />
                </div>
                <div id="todo_list" className="todo_list align_center">
                    <TodoList ref={instance => { this.child_guest = instance; }} edit_guest={this.edit_guest}/>
                </div>
            </div>
        </div>
    );
  }
}

export default Setup;
