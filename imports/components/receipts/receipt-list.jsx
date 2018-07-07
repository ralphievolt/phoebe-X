import React, { Component } from "react";
import Time from "react-time";
import NumberFormat from "react-number-format";
import moment from "moment";

import { withReceipts } from "/imports/api/receipts/receipts-list-data.js";
import Loading from "../loader/loading.jsx";

@withReceipts
export default class ReceiptsList extends Component {
  _format = number => {
    const num = number.toFixed(2);
    console.log(num);
    return num;
  };
  _formatDate = date => {
    return moment(date).format("YYYY/MM/DD");
  };

  render() {
    if (this.props.isLoading) return <Loading />;
    return (
      <div>
        <h3>Recent Receipt Transactions</h3>
        <table className="ui blue table striped">
          <thead>
            <tr>
              <th>Sub Category</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date(y/m/d)</th>
              <th>Entry by</th>
            </tr>
          </thead>
          <tbody>
            {this.props.receiptsList.map((item, index) => (
              <tr key={index}>
                <td>{item.subcategory1}</td>
                <td>{item.category}</td>
                <td>
                  <NumberFormat
                    value={this._format(item.amount)}
                    allowNegative={true}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Php "}
                  />
                </td>
                <td>{this._formatDate(item.date)}</td>
                <td>{item.created.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
