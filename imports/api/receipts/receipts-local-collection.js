import { Mongo } from 'meteor/mongo'

export const MonthlyReceipts = new Mongo.Collection('monthlyreceipts')
export const DetailsReceipt = new Mongo.Collection('detailsreceipt')