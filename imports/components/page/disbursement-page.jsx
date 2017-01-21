import React, { Component } from 'react'

import InsertDisbursement from '../disbursements/insert-disbursement.jsx'
import DisbursementList from '../disbursements/disbursement-list.jsx'


const DisbursementTransaction = () => (
  <div id="content" className="ui">
    <div className="ui grid">
      <div className="one wide column"></div>
      <div className="three wide column"> <InsertDisbursement /></div>
      <div className="eleven wide column"><DisbursementList /></div>
      <div className="one wide column"></div>
    </div>
  </div>
)
export default DisbursementTransaction