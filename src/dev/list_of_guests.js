import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';

import TodoItem from "./guest.js";

import { db } from '../v4/firebase_try.js';
import { onValue, ref, update, set, push, child, remove } from 'firebase/database';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuids_in_db: [],
            uuids_new: [],
            tasks: [],
            text: ''
        };
    }

    async delete_guest_from_db(uuid) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        
        const invite_reference = await ref(db, "/" + wedding + "/guests/" + uuid);
        // const getBlog = await get(invite_reference);
        await remove(invite_reference);
    }

    is_save_button_visible() {
        if (this.state == null) return false;
        if (this.state.uuids_new == null) return false;
        if (this.state.uuids_new.length == 0) return false;
        return true;
    }

    check_if_guest_in_table(uuid) {
        return this.state.uuids_in_db.includes(uuid);
    }

    componentWillMount() {
        this.get_guests_from_db();
    }

    get_guests_from_db() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        
        const query = ref(db, "/" + wedding + "/guests");
        onValue(query, (snapshot) => {
          if(snapshot.exists()) {
            const guests = snapshot.val();
            const guest_db_key = Object.keys(guests);
            for (const [key, value] of Object.entries(guests)) {
                if(!this.check_if_guest_in_table(value.hash)) {
                    this.add_user_from_db(value);
                }
            }
            const table_size = this.state.tasks.length;
            for (let table_i in this.state.tasks) {
                const table_guest_uuid = this.state.tasks.at(table_size - table_i - 1).id;
                if (!guest_db_key.includes(table_guest_uuid)) {
                    this.deleteTask(table_guest_uuid);
                }
            }
          }
        });
    }
   
    add_user_from_db(user) {
        const db_user = {
            description: user.name,
            number_of_people: user.expected_number,
            addressing_name: user.title,
            id: user.hash,
        };
        this.setState({tasks: [...this.state.tasks, db_user]});
        this.setState({uuids_in_db: [...this.state.uuids_in_db, user.hash]});
    }

    get_user_by_uuid(uuid) {
        return this.state.tasks.filter(task => task.id === uuid)[0];
    }

    async add_new_guest_to_db(guest_info) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        const invite_location = "/" + wedding + "/guests/";
        
        const updates = {};
            
        const postData = {
            responded: false,
            coming: false,
            expected_number: parseInt(guest_info.number_of_people),
            confirmed_number: parseInt(guest_info.number_of_people),
            hash: guest_info.id,
            title: guest_info.addressing_name,
            name: guest_info.description,
            single_person: parseInt(guest_info.number_of_people) <= 1
        };

        updates[invite_location + guest_info.id] = postData;

        await update(ref(db), updates);
    }

    async add_new_guests_to_db() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        const invite_location = "/" + wedding + "/guests/";
        
        const updates = {};

        for (let uuid_i in this.state.uuids_new) {
            const guest_info = this.get_user_by_uuid(this.state.uuids_new[uuid_i]);
            
            const postData = {
                responded: false,
                coming: false,
                number: guest_info.number_of_people,
                hash: guest_info.id,
                title: guest_info.addressing_name,
                name: guest_info.description,
                single_person: guest_info.number_of_people > 1
            };

            updates[invite_location + guest_info.id] = postData;
        }

        console.log("aaa");
        await update(ref(db), updates);
        
        
        this.setState({tasks: []});
        this.setState({uuids_new: []});
        this.get_guests_from_db();
    }
   
    add_user_to_table(description, number_of_people, addressing, addressing_name) {
        const alert_title = "Nepopunjena polja:";
        var alert_text = "";
        if (description == "" || description == null) {
            alert_text += "\n\tTko je pozvan?"
        }
        if (number_of_people == "" || number_of_people == null) {
            alert_text += "\n\tOčekivani broj ljudi"
        }
        if (addressing_name == "" || addressing_name == null) {
            alert_text += "\n\tKako osloviti?"
        }
        if (alert_text != "") {
            alert(alert_title + alert_text);
            return;
        }
        var uuid = uuidv4().slice(-8);
        while (this.state.uuids_in_db.includes(uuid) || this.state.uuids_new.includes(uuid)) {
            uuid = uuidv4().slice(-8);
        };
        const new_user = {
            description: description,
            number_of_people: number_of_people,
            addressing_name: addressing + " " + addressing_name,
            id: uuid,
        };
        // this.setState({tasks: [...this.state.tasks, new_user]});

        this.add_new_guest_to_db(new_user);

        return uuid;
    }

    on_button_add(description, number_of_people, addressing, addressing_name) {
        const uuid = this.add_user_to_table(description, number_of_people, addressing, addressing_name);
        // this.setState({uuids_new: [...this.state.uuids_new, uuid]});
    }

    deleteTask(id) {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    toggleCompleted(id) {
    //     setstate(tasks.map(task => {
    //         if (task.id === id) {
    //             return {...task, completed: !task.completed};
    //         } else {
    //             return task;
    //         } 
    //     }));
    }

    render() {
        return (
        <div className="guest_list">
            {this.state.tasks.map((task) => {
                return <TodoItem
                    key={task.id} 
                    task={task}
                    deleteTask={this.delete_guest_from_db}
                    toggleCompleted={this.toggleCompleted}/>
            })}
            {this.is_save_button_visible?.() ?
                <div className="button_save align_center add_guest_container_div">
                    <button
                        className="button_style"
                        onClick={() => { this.add_new_guests_to_db(); }}>Spremi
                    </button>
                </div> : ''
            }
        </div>
    )};
}

export default TodoList;
