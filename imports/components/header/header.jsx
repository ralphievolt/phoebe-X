import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'

import { withUser } from '/imports/api/users/users-data.js'


@withUser
export default class Header extends Component {

    state = {
        isAuthenticated: Meteor.userId() !== null,
    }
    componentWillMount = () => {
        if (!this.state.isAuthenticated) {
            browserHistory.push('/sign-in')
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (!this.state.isAuthenticated) {
            browserHistory.push('/sign-in')
        }
    }
    _logout = () => (event) => {
        event.preventDefault()
        Meteor.logout()
        browserHistory.push('/sign-in')
    }

    componentDidMount() {
        $('.ui.dropdown').dropdown()
    }

    render() {
        const currentUser = this.props.currentUser
        const userDataAvailable = (currentUser !== undefined)
        const loggedIn = (currentUser && userDataAvailable)
        return (
            <div>
                <div className="ui fixed stackable menu">
                    <IndexLink className="item header" name='Home' to="/">
                        <img src="/tranx.png" />  PHOEBE
                    </IndexLink>
                    <Link className="item" name='Receipts' to="/receipt-transaction">Receipts</Link>
                    <Link className="item" name='Disbursements' to="/disbursement-transaction">Disbursements</Link>
                    <div className="ui dropdown item">
                        Reports
                            <i className="dropdown icon"></i>
                        <div className="menu">
                            <Link className="item" to="/reports">Dashboard</Link>

                            <div className="ui divider"></div>
                            <div className="item"><h4>Receipts</h4></div>
                            <Link className="item" to="/receipts-monthly-performance">Monthly Performance</Link>
                            <Link className="item" to="/receipts-monthly-details">Monthly Details</Link>
                            <div className="ui divider"></div>
                            <div className="item"><h4>Disbursements</h4></div>
                            <Link className="item" to="/disbursements-monthly-performance">Monthly Performance</Link>
                            <Link className="item" to="/disbursements-monthly-details">Monthly Details</Link>
                        </div>
                    </div>

                    <div className="right menu">
                        <Link className="item" to="/manage-cat">Manage Categories</Link>
                        <Link className="item" to="/manage-subcat">Manage Sub-Categories</Link>
                        <Link className="item" to="/manage-users">Manage Users</Link>
                        <div className="ui dropdown item">
                            {loggedIn ? currentUser.username : ''}
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link className="item" to="/change-password">Change Password</Link>
                            </div>
                        </div>
                        <div className="ui item">
                            <i className="big sign out icon" onClick={this._logout(event)}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}