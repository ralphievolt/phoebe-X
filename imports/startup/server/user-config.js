Accounts.onCreateUser((options, user) => {
    // user.profile = options.profile || {}
    user.access = 'none'
    user.status = 'inactive'
    return user
});