import { isAdmin } from "/imports/api/users/checker.js";

Meteor.methods({
  "update.UserStatus"(id) {
    check(id, String);

    if (!Meteor.userId() || !isAdmin(Meteor.user())) {
      throw new Meteor.Error("unauthorized", "Access denied!");
    }

    if (Meteor.users.findOne({ _id: id }).status === "inactive") {
      Meteor.users.update(
        { _id: id, status: "inactive" },
        { $set: { status: "active" } }
      );
    } else if (Meteor.users.findOne({ _id: id }).status === "active") {
      Meteor.users.update(
        { _id: id, status: "active" },
        { $set: { status: "inactive" } }
      );
    }
  },

  "update.UserAccess"(id, access) {
    check(id, String);
    check(access, String);

    if (!Meteor.userId() || !isAdmin(Meteor.user())) {
      throw new Meteor.Error("unauthorized", "Access denied!");
    }
    Meteor.users.update(id, { $set: { access: access } });
  }
});
