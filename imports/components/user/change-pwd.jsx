import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { browserHistory, Link } from "react-router";

export default class ChangePwd extends Component {
  state = {
    oldpwd: "",
    newpwd: "",
    con: ""
  };
  _handleSubmit = () => event => {
    event.preventDefault();
    const oldpwd = this.state.oldpwd;
    const newpwd = this.state.newpwd;
    const con = this.state.con;

    if (newpwd !== con) {
      Bert.alert("Please confirm your password", "danger");
    } else {
      Accounts.changePassword(oldpwd, newpwd, err => {
        if (err) {
          Bert.alert(err.reason, "danger");
        } else {
          Bert.alert("New password change confirmed", "success");
          browserHistory.push("/sign-in");
        }
      });
    }
  };
  _onChangeUser = () => event => {
    const val = event.target.value;
    this.setState({ oldpwd: val });
  };
  _onChangePwd = () => event => {
    const val = event.target.value;
    this.setState({ newpwd: val });
  };
  _onChangeCon = () => event => {
    const val = event.target.value;
    this.setState({ con: val });
  };
  render() {
    const { oldpwd, newpwd, con } = this.state;
    return (
      <div id="content" className="ui one column center aligned grid">
        <div className="column three wide form-holder">
          <h2 className="center aligned header form-head">change password</h2>
          <form className="ui form" onSubmit={this._handleSubmit(event)}>
            <div className="field">
              <input
                type="password"
                placeholder="enter old password"
                value={oldpwd}
                onChange={this._onChangeUser(event)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="enter new password"
                value={newpwd}
                onChange={this._onChangePwd(event)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="confirm new password"
                value={con}
                onChange={this._onChangeCon(event)}
              />
            </div>
            <div className="ui divider" />
            <div className="field">
              <button className="ui basic blue button fluid">
                submit new password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
