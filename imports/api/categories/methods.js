import { check } from 'meteor/check'

import { CategoriesCol } from './categories-collection.js'
import { isAdmin } from '/imports/api/users/checker.js'

Meteor.methods({
    'insert.Category': (category) => {
        check(category, {
            type: String,
            category: String
        })

         if (!Meteor.userId() || !isAdmin(Meteor.user())) {
            throw new Meteor.Error('unauthorized', 'Access denied!')
        }

        if (category.type === '' || category.category === '') {
            throw new Meteor.Error('Field Error', 'Type or Category cannot be empty')
        }

        category.status = 'show'
        category.created = {
            by: Meteor.user().username,
            at: new Date() 
        }
        return CategoriesCol.insert(category)
    },

    'update.Category'(id) {
        check(id, String)
        const stat = CategoriesCol.findOne(id).status

         if (!Meteor.userId() || !isAdmin(Meteor.user())) {
            throw new Meteor.Error('unauthorized', 'Access denied!')
        }

        if (stat === 'show') {
            CategoriesCol.update(id, {
                $set: {
                    status: 'hidden',
                    'created.by': Meteor.user().username,             //Meteor.user().emails[0].address,
                    'created.at': new Date()
                }
            })
        }
        if (stat === 'hidden') {
            CategoriesCol.update(id, {
                $set: {
                    status: 'show',
                    'created.by': Meteor.user().username,             //Meteor.user().emails[0].address,
                    'created.at': new Date()
                }
            })
        }
    },
})