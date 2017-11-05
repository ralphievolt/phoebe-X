const isViewer = user => {
  return user.status === "active" && user.access === "viewer";
};
export const isEncoder = user => {
  return user.status === "active" && user.access === "encoder";
};
export const isAdmin = user => {
  return user.status === "active" && user.access === "admin";
};
export const canInsert = user => {
  const doInsert = isEncoder(user) || isAdmin(user);
  return doInsert;
};
export const canView = user => {
  const doView = isViewer(user) || isEncoder(user) || isAdmin(user);
  return doView;
};
