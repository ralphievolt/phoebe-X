import { check } from 'meteor/check'
import moment from 'moment'

import { canInsert } from '/imports/api/users/checker.js'
import { Disbursements } from './disbursements-collection.js'


Meteor.methods({
    'insert.Disbursement': (disbursement) => {
        check(disbursement, {
            category: String,
            subcategory1: String,
            subcategory2: String,
            amount: Number,
            remark: String
        })

        if (!Meteor.userId() || !canInsert(Meteor.user())) {
            throw new Meteor.Error('unauthorized', 'Access denied!')
        }

        if (disbursement.subcategory1 === '' || disbursement.subcategory2 === '' || disbursement.category === '' || disbursement.amount === '') {
            throw new Meteor.Error('Field Error', 'Fields cannot be empty')
        }

        disbursement.created = {
            by: Meteor.user().username,
            at: new Date()
        }

        return Disbursements.insert(disbursement)
    },

})