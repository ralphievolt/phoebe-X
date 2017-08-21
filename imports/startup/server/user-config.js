Accounts.onCreateUser((options, user) => {
  user.access = "none";
  user.status = "inactive";
  return user;
});
