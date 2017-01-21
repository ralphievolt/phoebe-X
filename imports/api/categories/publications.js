import { CategoriesCol } from './categories-collection.js'

Meteor.publish('categoriesList', function() {
    // Meteor._sleepForMs(2000)
    
    return CategoriesCol.find()
})

Meteor.publish('categoriesFiltered', function(catType) {
    check(catType,String)
    
    return CategoriesCol.find({ type: catType, status: 'show' })
})