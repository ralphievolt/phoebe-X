import { Receipts } from "./receipts-collection.js";
import moment from "moment";

Meteor.publish("receiptsList", function() {
  return Receipts.find({}, { sort: { date: -1 }, limit: 300 });
});

Meteor.publish("receipts.Performance", function() {
  const todaysDate = moment().format("YYYY-MM-DD") + "T23:59:59.999Z";
  const initSixMonthsAgo = moment()
    .subtract(6, "months")
    .endOf("month")
    .toDate();

  const sixMonthsAgo = moment(initSixMonthsAgo)
    .add(1, "day")
    .format("YYYY-MM-DD");

  const start = new Date(sixMonthsAgo + "T00:00:00.000Z");
  const end = new Date(todaysDate);

  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" }
        },
        amount: {
          $sum: "$amount"
        }
      }
    },
    {
      $group: {
        _id: "$_id.month",
        year: {
          $push: {
            year: "$_id.year"
          }
        },
        total: {
          $sum: "$amount"
        }
      }
    },
    {
      $sort: {
        "year.year": 1,
        _id: 1
      }
    }
  ];
  ReactiveAggregate(this, Receipts, pipeline, {
    clientCollection: "monthlyreceipts"
  });
});

Meteor.publish("receipts.Details", function(date) {
  check(date, String);

  let start = date + "T00:00:00.000Z";
  let end = moment(start)
    .endOf("month")
    .format("YYYY-MM-DD");

  start = new Date(start);
  end = new Date(end + "T23:59:59.999Z");

  const pipeline = [
    {
      $match: {
        date: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: {
          subcategory: "$subcategory1",
          category: "$category"
        },
        amount: { $sum: "$amount" }
      }
    },
    {
      $group: {
        _id: "$_id.category",
        data: {
          $push: {
            subcategory: "$_id.subcategory",
            amount: "$amount"
          }
        },
        amount: { $sum: "$amount" }
      }
    },
    {
      $sort: {
        _id: 1,
        "data.subcategor": 1
      }
    }
  ];
  ReactiveAggregate(this, Receipts, pipeline, {
    clientCollection: "detailsreceipt"
  });
});
