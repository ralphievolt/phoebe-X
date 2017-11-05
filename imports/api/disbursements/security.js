import { Disbursements } from "./disbursements-collection.js";

Disbursements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});
Disbursements.deny({
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
