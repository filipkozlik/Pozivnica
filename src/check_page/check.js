import React, { Component } from "react";
import "./check.css";

import GuestTable from './list_of_guests.js';

class Check extends Component {

  render() {
    return (
        <div>
            <div className="check_container">
                <div id="label_accepted" className="label_accepted align_center">
                    <div className="fancy_text">Potvrđeno</div>
                </div>
                <div id="label_rejected" className="label_rejected align_center">
                    <div className="fancy_text">Odbijeno</div>
                </div>
                <div id="label_unknown" className="label_unknown align_center">
                    <div className="fancy_text">Nije odgovoreno</div>
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
