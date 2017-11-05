import { CategoriesCol } from "./categories-collection.js";

CategoriesCol.deny({
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
CategoriesCol.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});
