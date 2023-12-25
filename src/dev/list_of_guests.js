import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';

import TodoItem from "./guest.js";

import { db } from '../v4/firebase_try.js';
import { onValue, ref, update, set, push, child } from 'firebase/database';

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

    is_save_button_visible() {
        if (this.state == null) return false;
        if (this.state.uuids_new == null) return false;
        if (this.state.uuids_new.length == 0) return false;
        return true;
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
            this.setState({tasks: []});
            this.setState({uuids_in_db: []});
            for (const [key, value] of Object.entries(guests)) {
                this.add_user_from_db(value);
            }
          }
        });
    }
   
    add_user_from_db(user) {
        const db_user = {
            description: user.name,
            number_of_people: user.number,
            addressing_name: user.title,
            id: user.hash,
        };
        this.setState({tasks: [...this.state.tasks, db_user]});
        this.setState({uuids_in_db: [...this.state.uuids_in_db, user.hash]});
    }

    get_user_by_uuid(uuid) {
        return this.state.tasks.filter(task => task.id === uuid)[0];
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
                name: guest_info.description
            };

            updates[invite_location + guest_info.id] = postData;
        }

        console.log("aaa");
        await update(ref(db), updates);
        
        
        this.setState({tasks: []});
        this.setState({uuids_new: []});
        this.get_guests_from_db();
    }

    handle_guest_add(description, number_of_people, addressing, addressing_name) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        this.setState({
          ready: false,
        });
        
        const query = ref(db, "/" + wedding + "/guests");
        onValue(query, (snapshot) => {
          if(snapshot.exists()) {
            const guests = snapshot.val();
            const keys = Object.keys(guests);
            var uuid = uuidv4().slice(-8);
            while (keys.includes(uuid)) {
                uuid = uuidv4().slice(-8);
            };
            const newTask = {
                description: description,
                number_of_people: number_of_people,
                addressing_name: addressing + " " + addressing_name,
                id: uuid,
            };
            this.setState({tasks: [...this.state.tasks, newTask]});
            this.setState({uuids_new: [...this.state.uuids_new, uuid]});
            // this.add_guest_to_db(newTask);
          }
        });
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
        this.setState({tasks: [...this.state.tasks, new_user]});
        return uuid;
    }

    on_button_add(description, number_of_people, addressing, addressing_name) {
        const uuid = this.add_user_to_table(description, number_of_people, addressing, addressing_name);
        this.setState({uuids_new: [...this.state.uuids_new, uuid]});
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
                    deleteTask={this.deleteTask}
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
