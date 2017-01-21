import React, { Component } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { receiptsMonthlyPerformance } from '/imports/api/receipts/receipts-aggregate-data.js'
import Loading from '../loader/loading.jsx'


@receiptsMonthlyPerformance
export default class ReceiptsMonthlyPerformance extends Component {

    _renderData = () => {
        if (this.props.isDataLoading) {
            return <Loading />
        }
        return (
            <BarChart width={1100} height={300} data={this.props.receiptsList}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />

                <Bar dataKey="Months" fill="#82ca9d" />
            </BarChart>
        )
    }
    render() {
        return (
            <div id="content" className="ui main container">
                <div className="ui celled grid">
                    <h2>Receipts  Monthly  Performance</h2>
                    {this._renderData()}
                </div>
                <label className="ui green label">
                    ** do not forget to refresh page to update chart if someone is still encoding
                </label>
            </div>
        )
    }
}