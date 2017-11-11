import React, { Component } from "react";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loading from "../loader/loading.jsx";
import { appState } from "../../api/store/store.js";
import { CustomizedLabel, CustomizedAxisTick } from "../graph-helper/index.jsx";
import { receiptsMonthlyDetails } from "/imports/api/receipts/receipts-aggregate-data.js";
import { canView } from "/imports/api/users/checker.js";

@receiptsMonthlyDetails
export default class ReceiptsMonthlyDetails extends Component {
  state = {
    date: moment()
  };

  _format = number => {
    return number.toFixed(2);
  };

  _handleCalendar = dyt => {
    this.setState({
      date: dyt
    });
  };

  _buttonShow = () => event => {
    event.preventDefault();

    if (!Meteor.userId() || !canView(Meteor.user())) {
      Bert.alert("You are not authorized to view reports", "warning");
      return;
    }

    appState.set(
      "dateChartDetails",
      moment(this.state.date).format("YYYY-MM-DD")
    );
  };

  componentDidMount = () => {
    const x = moment(this.state.date).format("YYYY-MM-DD");
    const y = appState.get("dateChartDetails");

    if (x !== y) {
      appState.set(
        "dateChartDetails",
        moment(this.state.date).format("YYYY-MM-DD")
      );
    }
  };
  _renderData = () => {
    if (this.props.isDataLoading) {
      return <Loading />;
    }

    return (
      <BarChart
        width={1100}
        height={400}
        data={this.props.receiptsDetails}
        margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
      >
        <XAxis dataKey="_id" tick={<CustomizedAxisTick />} interval={0} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />

        <Bar
          name="RECEIPTS"
          dataKey="amount"
          fill="#82ca9d"
          label={<CustomizedLabel />}
        />
      </BarChart>
    );
  };
  render() {
    const year = moment(this.state.date).format("YYYY");
    const month = moment(this.state.date).format("MMMM DD");
    const emonth = moment(this.state.date)
      .endOf("month")
      .toDate();
    const last = moment(emonth).format("DD");

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
                <label>select day of the month</label>
                <DatePicker
                  dateFormat="MMMM DD, YYYY"
                  selected={this.state.date}
                  onChange={this._handleCalendar}
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
          <h3>
            {month} ~ {last} , {year} Receipts Details
          </h3>
          {this._renderData()}
        </div>
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

            {this.props.receiptsDetails.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item._id}</td>
                  <td />
                  <td />
                  <td>
                    <h4 className="ui green header">
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
