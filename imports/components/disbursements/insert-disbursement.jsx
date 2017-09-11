import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { DateField, Calendar } from "react-date-picker";

import { appState } from "../../api/store/store.js";
import { withDisbursement } from "/imports/api/sub-categories/subcategories-show-data.js";

let startD = appState.get("dateChartDetails");
const date = moment().format("YYYY-MM-DD");
const _selectStartDate = (dateString, { dateMoment, timestamp }) => {
  startD = dateString;
};

@withDisbursement
export default class InsertDisbursement extends Component {
  state = {
    subcategory2: "",
    category: "",
    subcategory1: "",
    amount: 0,
    remark: ""
  };
  _selectProg = () => event => {
    this.setState({ subcategory2: event.target.value });
    appState.set("selectedProgram", event.target.value);
  };
  _selectCat = () => event => {
    this.setState({ category: event.target.value });
    appState.set("selectedCategory", event.target.value);
  };
  _selectSub = () => event => {
    const val = event.target.value;
    this.setState({ subcategory1: val });
  };
  _inputAmount = () => event => {
    const val = event.target.value;
    this.setState({ amount: val });
  };
  _inputRemark = () => event => {
    const val = event.target.value;
    this.setState({ remark: val });
  };
  _handleSubmit = () => event => {
    event.preventDefault();

    const disbursement = this.state;
    const diff = moment().dayOfYear() - moment(startD).dayOfYear();

    if (!(diff >= 0 && diff < 7)) {
      Bert.alert("Entry is beyond cut-off date", "warning");
      return;
    }
    this.setState({
      subcategory2: "",
      category: "",
      subcategory1: "",
      amount: ""
    });
    $(".dropdown").dropdown("clear");

    disbursement.date = startD;
    disbursement.amount = parseFloat(disbursement.amount);

    Meteor.call("insert.Disbursement", disbursement, function(err, res) {
      if (err) {
        Bert.alert(err.reason, "warning");
      } else {
        Bert.alert("Disbursement amount added successfully", "success");
      }
    });
  };

  render() {
    const { subcategory1, subcategory2, category, amount, remark } = this.state;

    return (
      <form className="ui form" onSubmit={this._handleSubmit()}>
        <div className="field">
          <label>program</label>
          <select
            className="ui fluid search dropdown"
            value={subcategory2}
            onChange={this._selectProg()}
          >
            <option value="">select program</option>
            {this.props.programList.map((program, index) => (
              <option key={index} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>category</label>
          <select
            className="ui fluid search dropdown"
            value={category}
            onChange={this._selectCat()}
          >
            <option value="">select category</option>
            {this.props.categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>sub-category</label>
          <select
            className="ui fluid search dropdown"
            name="type"
            value={subcategory1}
            onChange={this._selectSub()}
          >
            <option value="">select sub-category</option>
            {this.props.subCategoryList.map((item, index) => (
              <option key={index} value={item.subcategory1}>
                {item.subcategory1}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>first day of the month</label>
          <DateField
            dateFormat="YYYY-MM-DD"
            date={date}
            onChange={_selectStartDate}
          />
        </div>

        <div className="field">
          <label>disburse amount</label>
          <input
            type="number"
            placeholder="enter disburse amount"
            onChange={this._inputAmount()}
            value={amount}
          />
        </div>
        <div className="field">
          <label>remarks</label>
          <textarea
            type="text"
            rows="4"
            maxLength="160"
            placeholder="add remarks or reference documents"
            onChange={this._inputRemark()}
          />
        </div>

        <button className="ui basic blue button" type="submit">
          submit
        </button>
      </form>
    );
  }
}
