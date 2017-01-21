// import PublishRelations from 'meteor/cottz:publish-relations'
import { SubCategoriesCol } from './subcategories-collection.js'
import { CategoriesCol } from '/imports/api/categories/categories-collection.js'

Meteor.publish('subCategoriesList', function() {
    return SubCategoriesCol.find()
})

Meteor.publish('subCategoriesFiltered', function(category) {
     check(category,String)
    return SubCategoriesCol.find({ category: category,  status: 'show' })
})

Meteor.publish('subCategoriesDisbursement', function() {
    return SubCategoriesCol.find({ status: 'show', subcategory2: { $exists: true }} )
}) 