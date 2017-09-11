import { withData } from 'meteor/orionsoft:react-meteor-data'

export const withUser = withData(() => {
    const handler = Meteor.subscribe('meteorUser')
    const isLoading = !handler.ready()
    const currentUser = Meteor.user()
    return { isLoading,currentUser }
})

export const withAllUsers = withData(() => {
    const handler = Meteor.subscribe('allUsers')
    const isLoading = !handler.ready()
    const userList = Meteor.users.find().fetch()
    return { isLoading,userList }
})