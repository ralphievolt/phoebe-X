import { withData } from 'meteor/orionsoft:react-meteor-data'
import moment from 'moment'
import { MonthlyReceipts, DetailsReceipt } from './receipts-local-collection.js'
import { appState } from '../../api/store/store.js'

export const receiptsMonthlyPerformance = withData(() => {
    const handler = Meteor.subscribe('receipts.Performance')
    const isDataLoading = !handler.ready()
    const receipts = MonthlyReceipts.find({}, { sort: { 'year.year': 1, _id: 1 } }).fetch()
    const receiptsList = []

    receipts.map((item, index) => {
        const objX = {
            name: moment().month(item._id - 1).format('MMM'),
            Months: item.total,
        }
        receiptsList.push(objX)
    })
    return { isDataLoading, receiptsList }
})

export const receiptsMonthlyDetails = withData(() => {
    const handler = Meteor.subscribe('receipts.Details', appState.get('dateChartDetails') )
    const isDataLoading = !handler.ready()
    const receiptsDetails = DetailsReceipt.find().fetch()

    return { isDataLoading, receiptsDetails }
})
