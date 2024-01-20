import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';

import Guest from "./guest.js";

import { db } from '../v4/firebase_try.js';
import { onValue, ref, update, set, push, child, remove } from 'firebase/database';

class GuestTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuids_in_db: [],
            tasks: [],
            filter: props.filter,
        };
    }

    componentWillMount() {
        this.get_guests_from_db();
    }

    async delete_guest_from_db(uuid) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        
        const invite_reference = await ref(db, "/" + wedding + "/guests/" + uuid);
        // const getBlog = await get(invite_reference);
        await remove(invite_reference);
    }

    check_if_guest_in_table(uuid) {
        return this.state.uuids_in_db.includes(uuid);
    }

    check_if_guest_fits_table_filter(value) {
        if (this.state.filter === "accepted") {
            return value.responded && value.coming;
        } else if (this.state.filter === "rejected") {
            return value.responded && !value.coming;
        } else if (this.state.filter === "unknown") {
            return !value.responded;
        }
        return false;
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
                if(!this.check_if_guest_in_table(value.hash) 
                    && this.check_if_guest_fits_table_filter(value)) {
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
            number_of_adults: user.number_adults_expected,
            number_of_kids: user.number_kids_expected,
            addressing_name: user.title,
            id: user.hash,
        };
        this.setState({tasks: [...this.state.tasks, db_user]});
        this.setState({uuids_in_db: [...this.state.uuids_in_db, user.hash]});
    }

    get_user_by_uuid(uuid) {
        return this.state.tasks.filter(task => task.id === uuid)[0];
    }

    deleteTask(id) {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    render() {
        return (
        <div className="guest_list">
            {this.state.tasks.map((task) => {
                return <Guest 
                    key={task.id}
                    task={task}
                    deleteTask={this.delete_guest_from_db}/>
            })}
        </div>
    )};
}

export default GuestTable;
