import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import { appState } from '../../api/store/store.js'
import { withCategoriesReceipt } from '/imports/api/categories/categories-show-data.js'
import { withSubCategoriesFiltered } from '/imports/api/sub-categories/subcategories-show-data.js'

@withCategoriesReceipt
@withSubCategoriesFiltered

export default class InsertReceipt extends Component {
    state = {
        category: '',
        subcategory1: '',
        amount: 0,
    }
    _selectCat = () => (event) => {
        const val = event.target.value
        this.setState({ category: val })
        appState.set('selectedCategory', event.target.value)
    }
    _selectSub = () => (event) => {
        const val = event.target.value
        this.setState({ subcategory1: val })
    }
    _inputAmount = () => (event) => {
        const val = event.target.value
        this.setState({ amount: val })
    }
    _inputRemarks = () => (event) => {
        const val = event.target.value
        this.setState({ remarks: val })
    }
    _handleSubmit = () => (event) => {
        event.preventDefault()
        const receipt = this.state

        this.setState({ subcategory1: '', category: '', amount: '' })
        $('.dropdown').dropdown('clear')

        receipt.amount = parseFloat(receipt.amount)

        Meteor.call('insert.Receipt', receipt, function (err, res) {
            if (err) {
                Bert.alert(err.reason, 'warning')
            } else {
                Bert.alert('Receipt amount added successfully', 'success')
            }
        })
    }
    render() {
        const { subcategory1, category, amount } = this.state
        return (
            <form className="ui form" onSubmit={this._handleSubmit()}>
                <div className="field">
                    <label>category</label>
                    <select className="ui fluid search dropdown"  value={category} onChange={this._selectCat()}>
                        <option value="">select category</option>
                        {this.props.catList.map((item, index) => (
                            <option key={index} value={item.category}>{item.category}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="field">
                    <label>sub-category</label>
                    <select className="ui fluid search dropdown"  value={subcategory1} onChange={this._selectSub()}>
                        <option value="">select sub-category</option>
                        {this.props.subCatList.map((item, index) => (
                            <option key={index} value={item.subcategory1}>{item.subcategory1}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="field">
                    <label>receipt amount</label>
                    <input type="number"
                        placeholder="enter receipt amount"
                        onChange={this._inputAmount()}
                        value={amount}
                        />
                </div>
                <button className="ui basic blue button" type="submit">submit</button>
            </form>
        )
    }
}