import React, { Component } from 'react'

import InsertCategory from '../categories/insert-category.jsx'
import CategoryList from '../categories/category-list.jsx'

const ManageCat = () => (
  <div id="content" className="ui">
    <div className="ui grid">
      <div className="one wide column"></div>
      <div className="three wide column"> <InsertCategory /></div>
      <div className="eleven wide column"><CategoryList /></div>
      <div className="one wide column"></div>
    </div>
  </div>
)
export default ManageCat