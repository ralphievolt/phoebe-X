Accounts.onCreateUser((options, user) => {
  user.access = "none";
  user.status = "inactive";
  return user;
});

Accounts.config({
  loginExpirationInDays: 0.5
});
