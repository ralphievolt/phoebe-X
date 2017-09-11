import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { browserHistory, Link } from "react-router";

export default class Register extends Component {
  state = {
    username: "",
    pwd: "",
    con: ""
  };
  _handleSubmit = () => event => {
    event.preventDefault();
    const user = this.state.username;
    const pwd = this.state.pwd;
    const con = this.state.con;

    if (user === "" || pwd === "") {
      Bert.alert("Please enter username or password", "warning");
      return;
    }

    if (pwd !== con) {
      Bert.alert("Confirm password not equal", "danger");
      return;
    }
    this.setState({ username: "" });
    this.setState({ pwd: "" });
    this.setState({ con: "" });

    Accounts.createUser({ username: user, password: pwd }, err => {
      if (err) {
        Bert.alert(err.reason, "danger");
      } else {
        browserHistory.push("/sign-in");
      }
    });
  };
  _onChangeUser = () => event => {
    const val = event.target.value;
    this.setState({ username: val.trim() });
  };
  _onChangePwd = () => event => {
    const val = event.target.value;
    this.setState({ pwd: val });
  };
  _onChangeCon = () => event => {
    const val = event.target.value;
    this.setState({ con: val });
  };
  render() {
    const { username, pwd, con } = this.state;
    return (
      <div id="content" className="ui one column center aligned grid">
        <div className="column three wide form-holder">
          <h2 className="center aligned header form-head">sign-up new user</h2>
          <form className="ui form" onSubmit={this._handleSubmit(event)}>
            <div className="field">
              <input
                type="text"
                placeholder="enter username"
                value={username}
                onChange={this._onChangeUser(event)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="enter password"
                value={pwd}
                onChange={this._onChangePwd(event)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="confirm password"
                value={con}
                onChange={this._onChangeCon(event)}
              />
            </div>
            <div className="ui divider" />
            <div className="field">
              <button className="ui basic blue button fluid">sign-up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
