import { check } from "meteor/check";

import { canInsert } from "/imports/api/users/checker.js";
import { Receipts } from "./receipts-collection.js";

Meteor.methods({
  "insert.Receipt": receipt => {
    check(receipt, {
      subcategory1: String,
      category: String,
      date: String,
      amount: Number
    });

    if (!Meteor.userId() || !canInsert(Meteor.user())) {
      throw new Meteor.Error("unauthorized", "Access denied!");
    }

    if (
      receipt.subcategory1 === "" ||
      receipt.category === "" ||
      receipt.amount === "" ||
      receipt.date === "" ||
      receipt.amount === "0"
    ) {
      throw new Meteor.Error("Field Error", "Fields cannot be empty");
    }

    receipt.date = new Date(receipt.date);
    receipt.created = {
      by: Meteor.user().username,
      at: new Date()
    };

    if (Meteor.isServer) {
      return Receipts.insert(receipt);
    }
  }
});
