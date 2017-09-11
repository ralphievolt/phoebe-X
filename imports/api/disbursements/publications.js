import { Disbursements } from "./disbursements-collection.js";
import moment from "moment";

Meteor.publish("disbursementsList", function() {
  return Disbursements.find({}, { sort: { "date": -1 }, limit: 15 });
});

Meteor.publish("disbursement.Performance", function() {
  const todaysDate = moment().toDate();
  const initSixMonthsAgo = moment()
    .subtract(6, "months")
    .endOf("month")
    .toDate();
  const sixMonthsAgo = moment(initSixMonthsAgo).add(1, "day").toDate();
  const pipeline = [
    {
      $match: {
        "date": { $gte: sixMonthsAgo, $lte: todaysDate }
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
  ReactiveAggregate(this, Disbursements, pipeline, {
    clientCollection: "monthlydisbursements"
  });
});

Meteor.publish("disbursement.Details", function(date) {
  check(date, String);

  const start = moment(date).toDate();
  const end = moment(start).endOf("month").toDate();

  const pipeline = [
    {
      $match: {
        "date": {
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
        _id: 1
      }
    }
  ];
  ReactiveAggregate(this, Disbursements, pipeline, {
    clientCollection: "detailsdisbursement"
  });
});
