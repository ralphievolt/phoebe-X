import { ReactiveDict } from "meteor/reactive-dict";
import moment from "moment";

export const appState = new ReactiveDict("appState");

appState.set("selectedCategory", "");
appState.set("selectedType", "");
appState.set("selectedProgram", "");
appState.set("dateChartDetails", moment().format("YYYY-MM-DD"));
appState.set("voucher", "");
