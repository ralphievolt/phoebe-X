import React, { Component } from "react";
import Time from "react-time";
import NumberFormat from "react-number-format";

import { withDisbursements } from "/imports/api/disbursements/disbursements-list-data.js";
import Loading from "../loader/loading.jsx";

@withDisbursements
export default class DisbursementList extends Component {
  _format = number => {
    return number.toFixed(2);
  };

  render() {
    if (this.props.isLoading) return <Loading />;

    return (
      <div>
        <h3>Recent Disbursement Transactions</h3>
        <table className="ui blue table striped">
          <thead>
            <tr>
              <th>Sub Category</th>
              <th>Program</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date(y-m-d)</th>
              <th>Remarks</th>
              <th>Entry by</th>
            </tr>
          </thead>
          <tbody>
            {this.props.disbursementsList.map((item, index) => (
              <tr key={index}>
                <td>{item.subcategory1}</td>
                <td>{item.subcategory2}</td>
                <td>{item.category}</td>
                <td>
                  <NumberFormat
                    value={this._format(item.amount)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Php  "}
                  />
                </td>
                <td>
                  <Time value={item.date} format="YYYY/MM/DD" />
                </td>
                <td>{item.remark}</td>
                <td>{item.created.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
