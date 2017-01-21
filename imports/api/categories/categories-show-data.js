import { withData } from 'meteor/orionsoft:react-meteor-data'

import { appState } from '/imports/api/store/store.js'
import {CategoriesCol} from './categories-collection.js'



export const withCategoriesReceipt = withData(() => {
    const handler = Meteor.subscribe('categoriesFiltered', 'Receipt')
    const isLoading = !handler.ready()
    const catList = CategoriesCol.find({}, 
    {
        sort: {category: 1},
        fields: { category: 1 }
    }).fetch()
    return { isLoading, catList }
})

export const withCategoriesDebit = withData(() => {
    const handler = Meteor.subscribe('categoriesFiltered', 'Disbursement')
    const isLoading = !handler.ready()
    const catList = CategoriesCol.find({}, {sort: {category: 1}}).fetch()
    return { isLoading, catList }
})

export const withCategoriesList = withData(() => {
    const handler = Meteor.subscribe('categoriesList')
    const isLoading = !handler.ready()
    const catList = CategoriesCol.find({}, {sort: {type: 1, category: 1}}).fetch()
    return { isLoading, catList }
})

export const withCategoriesFiltered = withData(() => {
    const handler = Meteor.subscribe('categoriesFiltered', appState.get('selectedType'))
    const isLoading = !handler.ready()
    const catList = CategoriesCol.find({}, {sort: {type: 1, category: 1}}).fetch()
    return { isLoading, catList }
})
