import React, { Component } from "react";
import "./dialog_add_guest.css";

class DialogGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
            number_of_adults: props.number_of_adults,
            number_of_kids: props.number_of_kids,
            addressing: props.addressing,
            addressing_name: props.addressing_name,
        }
    }

    render() {
        return (
            <div className="dialog_guest_container">
                
                <div className="label_description align_right add_guest_container_div">
                    <label for="label_description">Tko je pozvan?</label>
                </div>
                <div className="description align_left input_field add_guest_container_div">
                    <input required type="text" id="description" name="description" placeholder="Pero, Milka/Obitelj Kukuriku"
                        onChange={e => this.setState({description: e.target.value})}></input>
                </div>
                <div className="label_number_of_adults align_right add_guest_container_div">
                    <label for="label_number_of_adults">Odrasli:</label>
                </div>
                <div className="number_of_adults align_left add_guest_container_div">
                    <input required className="input_number" type="number" id="number_of_adults" name="number_of_adults" placeholder="2" min="1"
                        onChange={e => this.setState({number_of_adults: e.target.value})}></input>
                </div>
                <div className="label_number_of_kids align_right add_guest_container_div">
                    <label for="label_number_of_kids">Djeca:</label>
                </div>
                <div className="number_of_kids align_left add_guest_container_div">
                    <input required className="input_number" type="number" id="number_of_kids" name="number_of_adults" placeholder="2" min="1"
                        onChange={e => this.setState({number_of_kids: e.target.value})}></input>
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
            </div>
        );
    }
}

export default DialogGuest;
