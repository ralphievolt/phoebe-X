import { withData } from 'meteor/orionsoft:react-meteor-data'

import { Receipts } from './receipts-collection.js'

export const withReceipts = withData(() => {
    const handler = Meteor.subscribe('receiptsList')
    const isLoading = !handler.ready()
    const receiptsList = Receipts.find({}, {sort: { 'created.at': -1 }}).fetch()
    return { isLoading, receiptsList }
})
