import React from 'react'
import { DateField, Calendar } from 'react-date-picker'

import 'react-date-picker/index.css'

const onChange = (dateString, { dateMoment, timestamp }) => {
  console.log(dateString)
}

let date = '2017-01-24'

const Reports = () => (
  <div className="ui main container">
    

    <div className="ui celled grid">
      <div className="five wide column">Credit</div>
      <div className="five wide column">
        <form className="ui form">
          <div className="field">
            <label>Start Date</label>
            <DateField
              dateFormat="YYYY-MM-DD"
              date={date}
              onChange={onChange}
              />
          </div>
          <div className="field">
            <label>End Date</label>
            <DateField dateFormat="MM-DD-YYYY" onChange={onChange} />
          </div>
        </form>
      </div>
      <div className="six wide column">
        Bank
        <p>http://recharts.org</p>
      </div>
    </div>

  </div>
)
export default Reports