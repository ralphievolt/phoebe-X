Meteor.users.deny({
  update() { return true; },
  remove() { return true; }
})