import { withData } from 'meteor/orionsoft:react-meteor-data'

import { Disbursements } from './disbursements-collection.js'


export const withDisbursements = withData(() => {
    const handler = Meteor.subscribe('disbursementsList')
    const isLoading = !handler.ready()
    const disbursementsList = Disbursements.find({}, {sort: { 'created.at': -1 }}).fetch()
    return { isLoading, disbursementsList }
})
