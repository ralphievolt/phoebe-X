import { SubCategoriesCol } from "./subcategories-collection.js";

SubCategoriesCol.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});
SubCategoriesCol.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});
