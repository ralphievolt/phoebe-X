import React, { Component } from 'react'

import { withSubCategories } from '/imports/api/sub-categories/subcategories-show-data.js'
import Loading from '../loader/loading.jsx'

@withSubCategories
export default class SubCategoryList extends Component {

    _handleItemClick = () => (event) => {
        const id = event.target.value
        Meteor.call('update.SubCategory', id, function (err, res) {
            if (err) {
                Bert.alert(err.reason, 'warning')
            } else {
                Bert.alert('Sub-Category status udpated successfully', 'success')
            }
        })
    }

    render() {
        if (this.props.isLoading) return <Loading />
        
        return (
            <table className="ui blue table striped">
                <thead>
                    <tr>
                        <th>Sub-Category Name</th>
                        <th>Program</th>
                        <th>Category Name</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.subCatList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.subcategory1}</td>
                            <td>{item.subcategory2}</td>
                            <td>{item.category}</td>
                            <td>{item.created.by}</td>
                            <td>
                                <button className="ui blue basic mini button" value={item._id} onClick={this._handleItemClick(event)} >{item.status}</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        )
    }
}