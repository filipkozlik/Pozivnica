import React, { Component } from "react";
import "./check.css";

import GuestTable from './list_of_guests.js';

import { db } from '../v4/firebase_try.js';
import { onValue, ref, update, set, push, child, remove } from 'firebase/database';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_invite: 0,
            total_adults: 0,
            total_kids: 0,
            accepted_invite: 0,
            accepted_adults: 0,
            accepted_kids: 0,
            rejected_invite: 0,
            rejected_adults: 0,
            rejected_kids: 0,
            unknown_invite: 0,
            unknown_adults: 0,
            unknown_kids: 0,
            place_needed: 0,
        };
    }

    check_if_guest_fits_table_filter(value, filter) {
        if (filter === "accepted") {
            return value.responded && value.coming;
        } else if (filter === "rejected") {
            return value.responded && !value.coming;
        } else if (filter === "unknown") {
            return !value.responded;
        }
        return false;
    }

    componentWillMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let wedding = params.get("wedding");
        
        const query = ref(db, "/" + wedding + "/guests");
        onValue(query, (snapshot) => {
          if(snapshot.exists()) {
            const invites = snapshot.val();
            let total_no_invites = 0;
            let total_no_adults = 0;
            let total_no_kids = 0;
            let accepted_no_invites = 0;
            let accepted_no_adults = 0;
            let accepted_no_kids = 0;
            let rejected_no_invites = 0;
            let rejected_no_adults = 0;
            let rejected_no_kids = 0;
            let unknown_no_invites = 0;
            let unknown_no_adults = 0;
            let unknown_no_kids = 0;
            let no_place_needed = 0;

            const guest_db_key = Object.keys(invites);

            for (const [key, value] of Object.entries(invites)) {
                total_no_invites += 1;
                total_no_adults += value.number_adults_expected;
                total_no_kids += value.number_kids_expected;
                if(this.check_if_guest_fits_table_filter(value, "accepted")) {
                    accepted_no_invites += 1;
                    accepted_no_adults += value.number_adults_confirmed;
                    accepted_no_kids += value.number_kids_confirmed;
                    no_place_needed += 1;
                } else if(this.check_if_guest_fits_table_filter(value, "rejected")) {
                    rejected_no_invites += 1;
                    rejected_no_adults += value.number_adults_expected;
                    rejected_no_kids += value.number_kids_expected;
                } else if(this.check_if_guest_fits_table_filter(value, "unknown")) {
                    unknown_no_invites += 1;
                    unknown_no_adults += value.number_adults_expected;
                    unknown_no_kids += value.number_kids_expected;
                }
            }
            this.setState({
                total_invite: total_no_invites,
                total_adults: total_no_adults,
                total_kids: total_no_kids,
                accepted_invite: accepted_no_invites,
                accepted_adults: accepted_no_adults,
                accepted_kids: accepted_no_kids,
                rejected_invite: rejected_no_invites,
                rejected_adults: rejected_no_adults,
                rejected_kids: rejected_no_kids,
                unknown_invite: unknown_no_invites,
                unknown_adults: unknown_no_adults,
                unknown_kids: unknown_no_kids,
                place_needed: no_place_needed,
            });
          }
        });
    }

  render() {
    return (
        <div>
            <div className="check_container">
                <div id="label_accepted" className="label_accepted table_info_accepted_container align_center">
                    <div className="table_title text_bold align_center">Potvrđeno</div>
                    <div className="table_label_no_invite fancy_text align_center">Pozivnica:</div>
                    <div className="table_label_no_adults fancy_text align_center">Odrasli:</div>
                    <div className="table_label_no_kids fancy_text align_center">Djeca:</div>
                    <div className="table_label_place fancy_text align_center">Smještaj:</div>
                    <div className="table_no_invite fancy_text align_center">{this.state.accepted_invite}/{this.state.total_invite}</div>
                    <div className="table_no_adults fancy_text align_center">{this.state.accepted_adults}/{this.state.total_adults}</div>
                    <div className="table_no_kids fancy_text align_center">{this.state.accepted_kids}/{this.state.total_kids}</div>
                    <div className="table_place fancy_text align_center">{this.state.place_needed}</div>
                </div>
                <div id="label_rejected" className="label_rejected table_info_container align_center">
                    <div className="table_title text_bold align_center">Odbijeno</div>
                    <div className="table_label_no_invite fancy_text align_center">Pozivnica:</div>
                    <div className="table_label_no_adults fancy_text align_center">Odrasli:</div>
                    <div className="table_label_no_kids fancy_text align_center">Djeca:</div>
                    <div className="table_no_invite fancy_text align_center">{this.state.rejected_invite}/{this.state.total_invite}</div>
                    <div className="table_no_adults fancy_text align_center">{this.state.rejected_adults}/{this.state.total_adults}</div>
                    <div className="table_no_kids fancy_text align_center">{this.state.rejected_kids}/{this.state.total_kids}</div>
                </div>
                <div id="label_unknown" className="label_unknown table_info_container align_center">
                    <div className="table_title text_bold align_center">Nije odgovoreno</div>
                    <div className="table_label_no_invite fancy_text align_center">Pozivnica:</div>
                    <div className="table_label_no_adults fancy_text align_center">Odrasli:</div>
                    <div className="table_label_no_kids fancy_text align_center">Djeca:</div>
                    <div className="table_no_invite fancy_text align_center">{this.state.unknown_invite}/{this.state.total_invite}</div>
                    <div className="table_no_adults fancy_text align_center">{this.state.unknown_adults}/{this.state.total_adults}</div>
                    <div className="table_no_kids fancy_text align_center">{this.state.unknown_kids}/{this.state.total_kids}</div>
                </div>
                <div id="table_accepted" className="table_accepted align_center">
                    <GuestTable ref={instance => { this.table_accepted = instance; }} filter="accepted"/>
                </div>
                <div id="table_rejected" className="table_rejected align_center">
                    <GuestTable ref={instance => { this.table_rejected = instance; }} filter="rejected"/>
                </div>
                <div id="table_unknown" className="table_unknown align_center">
                    <GuestTable ref={instance => { this.table_unknown = instance; }} filter="unknown"/>
                </div>
            </div>
        </div>
    );
  }
}

export default Check;
