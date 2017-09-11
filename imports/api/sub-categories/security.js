import { SubCategoriesCol } from './subcategories-collection.js'

SubCategoriesCol.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
})