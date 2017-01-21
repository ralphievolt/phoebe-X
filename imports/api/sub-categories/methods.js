import { check } from 'meteor/check'

import { SubCategoriesCol } from './subcategories-collection.js'
import { isAdmin } from '/imports/api/users/checker.js'

Meteor.methods({
    'insert.SubCategory': (sub) => {
        check(sub, {
            type: String,
            subcategory1: String,
            subcategory2: String,
            category: String,
        })
        let subcat = {}

        if (sub.subcategory2 !== '') {
            subcat = {
                subcategory1: sub.subcategory1,
                subcategory2: sub.subcategory2,
                category: sub.category
            }
        } else {
            subcat = {
                subcategory1: sub.subcategory1,
                category: sub.category
            }
        }

        if (!Meteor.userId() || !isAdmin(Meteor.user().access)) {
            throw new Meteor.Error('unauthorized', 'Access denied!')
        }
        if (subcat.subcategory1 === '' || subcat.category === '') {
            throw new Meteor.Error('Field Error', 'Sub Category or Category cannot be empty')
        }

        subcat.status = 'show'
        subcat.category = subcat.category
        subcat.created = {
            by: Meteor.user().username,
            at: new Date()
        }
        return SubCategoriesCol.insert(subcat)
    },
    'update.SubCategory'(id) {
        check(id, String)
        const stat = SubCategoriesCol.findOne(id).status;

        if (!Meteor.userId() || !isAdmin(Meteor.user().access)) {
            throw new Meteor.Error('unauthorized', 'Access denied!')
        }

        if (stat === 'show') {
            SubCategoriesCol.update(id, {
                $set: {
                    status: 'hidden',
                    'created.by': Meteor.user().username,            //Meteor.user().emails[0].address,
                    'created.at': new Date()
                }
            });
        }
        if (stat === 'hidden') {
            SubCategoriesCol.update(id, {
                $set: {
                    status: 'show',
                    'created.by': Meteor.user().username,             //Meteor.user().emails[0].address,
                    'created.at': new Date()
                }
            });
        }
    },
})