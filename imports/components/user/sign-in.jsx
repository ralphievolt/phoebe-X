import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

export default class Login extends Component {
    state = {
        username: '',
        pwd: ''
    }
    _handleSubmit = () => (event) => {
        event.preventDefault()
        const user = this.state.username
        const pwd = this.state.pwd
        Meteor.loginWithPassword(user, pwd, (err) => {
            if (err) {
                Bert.alert(err.reason, 'danger')
            } else {
                browserHistory.push('/')
            }
        })
    }
    _onChangeUser = () => (event) => {
        const val = event.target.value
        this.setState({ username: val.trim() })
    }
    _onChangePwd = () => (event) => {
        const val = event.target.value
        this.setState({ pwd: val.trim() })
    }
    _signUp = () => {
        browserHistory.push('/sign-up')
    }
    render() {
        const { username, pwd } = this.state
        return (
            <div id="content" className="ui one column center aligned grid">
                <div className="column four wide form-holder">
                    <h2 className="center aligned header form-head">sign in</h2>
                    <form className="ui form" onSubmit={this._handleSubmit(event)}>
                        <div className="field">
                            <input 
                                placeholder="enter username"
                                value={username}
                                onChange={this._onChangeUser(event)}
                                />
                        </div>
                        <div className="field">
                            <input type="password"
                                placeholder="enter password"
                                value={pwd}
                                onChange={this._onChangePwd(event)}
                                />
                        </div>
                        <div className="ui divider"></div>
                        <div className="field">
                            <button className="ui basic blue button fluid" >sign in</button>
                        </div>
                    </form>
                    <p></p>
                    <div className="field">
                        <button className="ui basic green button fluid" onClick={this._signUp} >sign up</button>
                    </div>
                </div>
            </div>
        )
    }
} 