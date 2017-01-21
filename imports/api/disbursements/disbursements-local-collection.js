import { Mongo } from 'meteor/mongo'

export const MonthlyDisbursements = new Mongo.Collection('monthlydisbursements')
export const DetailsDisbursement = new Mongo.Collection('detailsdisbursement')