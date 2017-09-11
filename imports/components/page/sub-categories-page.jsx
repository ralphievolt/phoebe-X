import React, { Component } from 'react'

import InsertSubCategory from '../sub-categories/insert-sub-category.jsx'
import SubCategoryList from '../sub-categories/sub-category-list.jsx'

const ManageSubCat = () => (
  <div id="content" className="ui">
    <div className="ui grid">
      <div className="one wide column"></div>
      <div className="three wide column"><InsertSubCategory /></div>
      <div className="eleven wide column"><SubCategoryList /></div>
      <div className="one wide column"></div>
    </div>
  </div>
)
export default ManageSubCat