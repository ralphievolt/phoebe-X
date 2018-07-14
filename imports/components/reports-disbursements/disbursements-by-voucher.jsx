import React, { Component } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { canView } from "/imports/api/users/checker.js";

import { disbursementsByVoucher } from "/imports/api/disbursements/disbursements-aggregate-data.js";
import { appState } from "../../api/store/store.js";

@disbursementsByVoucher
export default class DisbursementsByVoucher extends Component {
  state = {
    voucher: ""
  };

  _format = number => {
    return number.toFixed(2);
  };

  _searchText = () => event => {
    const val = event.target.value;
    this.setState({ voucher: val });
  };

  _buttonShow = () => event => {
    event.preventDefault();

    if (!Meteor.userId() || !canView(Meteor.user())) {
      Bert.alert("You are not authorized to view reports", "warning");
      return;
    }

    appState.set("voucher", this.state.voucher);
  };

  render() {
    console.log(this.props.disbursementDetails);

    return (
      <div id="content" className="ui main container">
        <form className="ui form" onSubmit={this._buttonShow()}>
          <div className="field">
            <div className="five wide field">
              <h3 className="ui dividing header">
                Choose a Month for Chart Details
              </h3>
            </div>
            <div className="three fields">
              <div className="three wide field">
                <label>Search Voucher</label>
                <input
                  id="recInput"
                  type="text"
                  placeholder="enter text remarks"
                  onChange={this._searchText(event)}
                  value={this.state.voucher}
                />
              </div>
              <div className="one wide field">
                <label>show</label>
                <button className="ui basic blue button" type="submit">
                  show
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="ui celled grid">
          <h3>Raw Details</h3>
          <table className="ui blue table striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Sub Category</th>
                <th />
                <th>Amount</th>
              </tr>
            </thead>

            {this.props.disbursementDetails.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item._id}</td>
                  <td />
                  <td />
                  <td>
                    <h4 className="ui blue header">
                      <NumberFormat
                        value={this._format(item.amount)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Php  "}
                      />
                    </h4>
                  </td>
                </tr>
                {item.data.map((dat, i) => (
                  <tr key={i}>
                    <td />
                    <td>{dat.subcategory}</td>
                    <td>
                      <NumberFormat
                        value={this._format(dat.amount)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Php  "}
                      />
                    </td>
                    <td />
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
