import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import { appState } from '../../api/store/store.js'
import { withCategoriesFiltered } from '/imports/api/categories/categories-show-data.js'

@withCategoriesFiltered
export default class InsertSubCategory extends Component {

    state = {
        type: '',
        subcategory1: '',
        subcategory2: '',
        category: ''
    }
    _renderSubCat2 = () => {
        if (this.state.type === 'Disbursement') {
            return (
                <div className="field">
                    <label>program</label>
                    <input type="text"
                        name="subcategory2"
                        placeholder="enter new program"
                        onChange={this._inputSub2(event)}
                        value={this.state.subcategory2}
                        maxLength="30"
                        />
                </div>
            )
            return
        }
    }
    _selectType = () => (event) => {
        const val = event.target.value
        this.setState({ type: event.target.value })
        appState.set('selectedType', event.target.value)
    }
    _selectCat = () => (event) => {
        const val = event.target.value
        this.setState({ category: val })
    }
    _inputSub1 = () => (event) => {
        const val = event.target.value
        this.setState({ subcategory1: val })
    }
    _inputSub2 = () => (event) => {
        const val = event.target.value
        this.setState({ subcategory2: val })
    }
    _handleSubmit = () => (event) => {
        event.preventDefault()

        if (!Meteor.userId) {
            Bert.alert('Please login to continue', 'warning')
            browserHistory.push('/sign-in')
        }

        const { category, subcategory1, subcategory2 } = this.state

        if ( category === '' || subcategory1 === '' || subcategory1 === '' ) {
            Bert.alert('Fields are empty', 'warning')
            return
        }
        const subcat = this.state
        this.setState({ category: '', subcategory1: '', subcategory2: '' })
        $('.dropdown').dropdown('clear')


        Meteor.call('insert.SubCategory', subcat, function (err, res) {
            if (err) {
                Bert.alert(err.reason, 'warning')
            } else {
                 Bert.alert('New Sub Category name added successfully', 'success')
            }
        })
    }
    render() {
        const { subcategory2, subcategory1 } = this.state
        return (
            <form className="ui form" onSubmit={this._handleSubmit()}>
                <div className="field">
                    <label>type</label>
                    <select className="ui fluid search dropdown" onChange={this._selectType()}>
                        <option value="">select type</option>
                        <option value="Receipt">Receipt</option>
                        <option value="Disbursement">Disbursement</option>
                    </select>
                </div>

                <div className="field">
                    <label>category</label>
                    <select className="ui fluid search dropdown" value={this.state.category} onChange={this._selectCat()}>
                        <option value="">select category</option>
                        {this.props.catList.map((item, index) => (
                            <option key={index} value={item.category}>{item.category}</option>
                        )
                        )}
                    </select>
                </div>
                <div className="field">
                    <label>sub-category 1</label>
                    <input type="text"
                        name="subcategory1"
                        placeholder="enter new sub-category"
                        onChange={this._inputSub1()}
                        value={subcategory1}
                        maxLength="30"
                        />
                </div>
                {this._renderSubCat2()}
                <button className="ui basic blue button" type="submit">submit</button>
            </form>
        )
    }
}