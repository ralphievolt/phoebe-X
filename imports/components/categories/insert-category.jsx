import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

export default class InsertCategory extends Component {
  state = {
    type: "",
    category: ""
  };
  _selectType = () => event => {
    this.setState({ type: event.target.value });
  };
  _inputCat = () => event => {
    const val = event.target.value;
    this.setState({ category: val.toUpperCase() });
  };
  _handleSubmit = () => event => {
    event.preventDefault();
    const category = this.state;
    this.setState({ type: "", category: "" });
    $(".dropdown").dropdown("clear");

    Meteor.call("insert.Category", category, function(err, res) {
      if (err) {
        Bert.alert(err.reason, "warning");
      } else {
        Bert.alert("New Category  added successfully", "success");
      }
    });
  };
  render() {
    const { type, category } = this.state;
    return (
      <form className="ui form" onSubmit={this._handleSubmit()}>
        <div className="field">
          <label>type</label>
          <select
            className="ui fluid dropdown"
            value={type}
            onChange={this._selectType()}
          >
            <option value="">select type</option>
            <option value="Receipt">Receipt</option>
            <option value="Disbursement">Disbursement</option>
          </select>
        </div>
        <div className="field">
          <label>category</label>
          <input
            type="text"
            placeholder="enter new category"
            onChange={this._inputCat()}
            value={category}
            maxLength="30"
          />
        </div>
        <button className="ui basic blue button" type="submit">
          submit
        </button>
      </form>
    );
  }
}
