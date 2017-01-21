import React, { Component } from 'react'
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { DateField, Calendar } from 'react-date-picker'
import NumberFormat from 'react-number-format'

import Loading from '../loader/loading.jsx'
import { appState } from '../../api/store/store.js'
import { CustomizedLabel, CustomizedAxisTick } from '../graph-helper/index.jsx'
import { receiptsMonthlyDetails } from '/imports/api/receipts/receipts-aggregate-data.js'

let startD = appState.get('dateChartDetails')
const date = moment().format('YYYY-MM-DD')

const _selectStartDate = (dateString, { dateMoment, timestamp }) => {
    startD = dateString
}

@receiptsMonthlyDetails
export default class ReceiptsMonthlyDetails extends Component {

     _format = (number) => {
        return number.toFixed(2)
    }
    _buttonShow = () => (event) => {
        event.preventDefault()
        if (moment(startD).format('D') !== '1') {
            Bert.alert('Please choose the first day of the month', 'warning')
            return
        }
        appState.set('dateChartDetails', startD) 
    }
    _renderData = () => {
        if (this.props.isDataLoading) {
            return <Loading />
        }
        return (
            <BarChart width={1100} height={400} data={this.props.receiptsDetails}
                margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                <XAxis dataKey="_id" tick={<CustomizedAxisTick />} interval={0} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />

                <Bar name="RECEIPTS" dataKey="amount" fill="#82ca9d" label={<CustomizedLabel />} />
            </BarChart>
        )
    }
    render() {
        const year = moment(startD).format('YYYY')
        const month = moment(startD).format('MMMM')
        return (
            <div id="content" className="ui main container">
                <form className="ui form" onSubmit={this._buttonShow()}>
                    <div className="field">
                        <div className="five wide field">
                            <h3 className="ui dividing header">Choose a Month for Chart Details</h3>
                        </div>
                        <div className="three fields">
                            <div className="three wide field">
                                <label>first day of the month</label>
                                <DateField
                                    dateFormat="YYYY-MM-DD"
                                    date={date}
                                    onChange={_selectStartDate}
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
                    <h2>{month}  {year} Receipts Details</h2>
                    {this._renderData()}
                </div>
                <div className="ui celled grid">
                    <h3>Raw Details</h3>
                    <table className="ui blue table striped">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th></th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        {this.props.receiptsDetails.map((item, index) => (
                            <tbody key={index}>
                                <tr >
                                    <td>{item._id}</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <h4 className="ui green header">
                                            <NumberFormat
                                                value={this._format(item.amount)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Php  '}
                                                />
                                        </h4>
                                    </td>
                                </tr>
                                {item.data.map((dat, i) => (
                                    <tr key={i}>
                                        <td></td>
                                        <td>{dat.subcategory}</td>
                                        <td>
                                            <NumberFormat
                                                value={this._format(dat.amount)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Php  '}
                                                />
                                        </td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}