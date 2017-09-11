import React from 'react'
import moment from 'moment'

import { appState } from '../../api/store/store.js'

const thisYearLess3 = moment().subtract(3, 'years').toDate()
const thisYearLess2 = moment().subtract(2, 'years').toDate()
const thisYearLess1 = moment().subtract(1, 'years').toDate()
const thisYear = moment().toDate()
let initMonth = ''


const _selectMonth = () => (event) => {
    event.preventDefault()
    initMonth = event.target.value
}

const _selectYear = () => (event) => {
    event.preventDefault()
    const yeaR = event.target.value
    const  initDate = initMonth + '-' + yeaR.toString()
    const startDate = moment(initDate).toDate()
}

export const MonthsDropdown = () => (
    <div className="two wide field">
        <label>month</label>
        <select className="ui fluid dropdown" onChange={_selectMonth(event)}>
            <option value="">select month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
        </select>
    </div>
)



export const YearsDropdown = () => (
    <div className="two wide field">
        <label>year</label>
        <select className="ui fluid dropdown" onChange={_selectYear(event)}>
            <option value="">select year</option>
            <option value={moment(thisYear).format('YYYY')}>
                {moment(thisYear).format('YYYY')}
            </option>
            <option value={moment(thisYearLess1).format('YYYY')}>
                {moment(thisYearLess1).format('YYYY')}
            </option>
            <option value={moment(thisYearLess2).format('YYYY')}>
                {moment(thisYearLess2).format('YYYY')}
            </option>
            <option value={moment(thisYearLess3).format('YYYY')}>
                {moment(thisYearLess3).format('YYYY')}
            </option>
        </select>
    </div>
)