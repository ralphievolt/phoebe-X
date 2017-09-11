import React, { Component } from "react";
import Time from "react-time";

import { withAllUsers } from "/imports/api/users/users-data.js";
import Loading from "../loader/loading.jsx";

@withAllUsers
export default class UserList extends Component {
  state = {
    access: ""
  };
  _selectAccess = () => event => {
    const val = event.target.value;
    this.setState({ access: event.target.value });
  };

  _updateAccess = () => event => {
    const id = event.target.value;

    Meteor.call("update.UserAccess", id, this.state.access, function(err, res) {
      if (err) {
        Bert.alert(err.reason, "warning");
      } else {
        Bert.alert("Category status udpated successfully", "success");
      }
    });
  };

  _updateStatus = () => event => {
    const id = event.target.value;
    Meteor.call("update.UserStatus", id, function(err, res) {
      if (err) {
        Bert.alert(err.reason, "warning");
      } else {
        Bert.alert("Category status udpated successfully", "success");
      }
    });
  };

  render() {
    const { access } = this.state;
    if (this.props.isLoading) {
      return (
        <div id="content" className="ui">
          <Loading />
        </div>
      );
    }
    return (
      <div id="content" className="ui">
        <h3>Manage User Access and Status</h3>
        <table className="ui blue table striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Update Access</th>
              <th />
              <th>Current Access</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userList.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>
                  <div className="field">
                    <select
                      className="ui fluid dropdown"
                      onChange={this._selectAccess()}
                    >
                      <option value="none">select type</option>
                      <option value="viewer">viewer</option>
                      <option value="encoder">encoder</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </td>
                <td>
                  <button
                    className="ui grey basic mini button"
                    value={user._id}
                    onClick={this._updateAccess(event)}
                  >
                    update
                  </button>
                </td>
                <td>{user.access}</td>
                <td>
                  <button
                    className="ui grey basic mini button"
                    value={user._id}
                    onClick={this._updateStatus(event)}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <Time value={user.createdAt} format="YYYY/MM/DD h:mm A" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
