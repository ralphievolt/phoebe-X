Meteor.publish('meteorUser', function() {
    return Meteor.users.find(this.userId)
});

Meteor.publish('allUsers', function() {
    return Meteor.users.find()
})