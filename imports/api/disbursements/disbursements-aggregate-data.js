import { withData } from 'meteor/orionsoft:react-meteor-data'
import moment from 'moment'
import { MonthlyDisbursements, DetailsDisbursement } from './disbursements-local-collection.js'
import { appState } from '../../api/store/store.js'

export const disbursementsMonthlyPerformance = withData(() => {
    const handler = Meteor.subscribe('disbursement.Performance')
    const isDataLoading = !handler.ready()
    const disbursements = MonthlyDisbursements.find({}, { sort: { 'year.year': 1, _id: 1 } }).fetch()
    const disbursementsList = []

    disbursements.map((item, index) => {
        // console.log(item.year[0].year)
        const objX = {
            name: moment().month(item._id - 1).format('MMM'),
            Months: item.total,
        }
        disbursementsList.push(objX)
    })

    return { isDataLoading, disbursementsList }
})

export const disbursementsMonthlyDetails = withData(() => {
    const handler = Meteor.subscribe('disbursement.Details', appState.get('dateChartDetails') )
    const isDataLoading = !handler.ready()
    const disbursementDetails = DetailsDisbursement.find().fetch()

    return { isDataLoading, disbursementDetails }
})
