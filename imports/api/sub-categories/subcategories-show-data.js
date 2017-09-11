import { withData } from "meteor/orionsoft:react-meteor-data";

import { appState } from "/imports/api/store/store.js";
import { SubCategoriesCol } from "./subcategories-collection.js";

export const withSubCategoriesFiltered = withData(() => {
  const handler = Meteor.subscribe(
    "subCategoriesFiltered",
    appState.get("selectedCategory")
  );
  const isLoading = !handler.ready();
  const subCatList = SubCategoriesCol.find(
    {},
    {
      sort: { subcategory1: 1 },
      fields: { subcategory1: 1 }
    }
  ).fetch();
  return { isLoading, subCatList };
});

export const withSubCategories = withData(() => {
  const handler = Meteor.subscribe("subCategoriesList");
  const isLoading = !handler.ready();
  const subCatList = SubCategoriesCol.find(
    {},
    {
      sort: { subcategory2: 1, category: 1, subcategory1: 1 }
    }
  ).fetch();
  return { isLoading, subCatList };
});

export const withDisbursement = withData(() => {
  const handler = Meteor.subscribe("subCategoriesDisbursement");
  const isLoading = !handler.ready();
  const subCategoryList = SubCategoriesCol.find(
    {
      category: appState.get("selectedCategory")
    },
    {
      sort: { subcategory1: 1 },
      fields: { subcategory1: 1 }
    }
  ).fetch();
  const programList = _.uniq(
    _.pluck(
      SubCategoriesCol.find(
        {},
        {
          sort: { subcategory2: 1 },
          fields: { subcategory2: 1 }
        }
      ).fetch(),
      "subcategory2"
    )
  );
  const categoryList = _.uniq(
    _.pluck(
      SubCategoriesCol.find(
        {
          subcategory2: appState.get("selectedProgram")
        },
        {
          sort: { category: 1 },
          fields: { category: 1 }
        }
      ).fetch(),
      "category"
    )
  );

  return { isLoading, categoryList, programList, subCategoryList };
});
