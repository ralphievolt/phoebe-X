import { Disbursements } from './disbursements-collection.js'

Disbursements.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
})