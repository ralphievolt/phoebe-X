import React, { Component } from 'react'

import {withCategoriesList} from '/imports/api/categories/categories-show-data.js'
import Loading from '../loader/loading.jsx'

@withCategoriesList
export default class CategoryList extends Component {

    _handleItemClick = () => (event) => {
        const id = event.target.value
        Meteor.call('update.Category', id, function (err, res) {
            if (err) {
                Bert.alert(err.reason, 'warning')
            } else {
                Bert.alert('Category status udpated successfully', 'success')
            }
        })
    }

    render() {
        if (this.props.isLoading) return <Loading />
        
        return (
            <table className="ui blue table striped">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Type</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.catList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.type}</td>
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