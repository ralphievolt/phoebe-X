import { Receipts } from "./receipts-collection.js";

Receipts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Receipts.deny({
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
