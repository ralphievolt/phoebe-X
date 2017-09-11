import React, { Component } from 'react'

import InsertReceipt from '../receipts/insert-receipt.jsx'
import ReceiptsList from '../receipts/receipt-list.jsx'


const ReceiptTransaction = () => (
  <div id="content" className="ui">
    <div className="ui grid">
      <div className="one wide column"></div>
      <div className="three wide column"> <InsertReceipt /></div>
      <div className="eleven wide column"><ReceiptsList /></div>
      <div className="one wide column"></div>
    </div>
  </div>
)
export default ReceiptTransaction