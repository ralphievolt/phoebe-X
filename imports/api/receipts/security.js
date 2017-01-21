import { Receipts } from './receipts-collection.js'

Receipts.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
})