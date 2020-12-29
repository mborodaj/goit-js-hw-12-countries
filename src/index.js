import { alert, defaultModules } from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";

import css from "./css/styles.css";
import getRefs from "./js/refs";
import API from "./js/fetchCountries";
import countryTpl from "./templates/countryTemplate.hbs";
import listOfCountries from "./templates/countryList.hbs";
import * as debounce from "lodash.debounce";

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

const countrySearch = debounce((event) => {
  console.log(event.target.value.length);
  let searchQuery = event.target.value;

  if (searchQuery.length > 0) {
    API.fetchCountries(event.target.value)
      .then(renderMarkup)
      .catch(onFetchError);
  } else {
    clearMarkup();
  }
}, 500);

refs.searchField.addEventListener("input", countrySearch);

function renderMarkup(countryList) {
  let template;
  if (countryList.length === 1) {
    template = countryTpl(countryList);
  } else if (countryList.length > 1 && countryList.length <= 10) {
    template = listOfCountries(countryList);
  } else {
    alert({
      text: "Please enter more specific query!",
    });
    return;
  }
  refs.dataContainer.innerHTML = template;
}

function clearMarkup() {
  refs.dataContainer.innerHTML = "";
}

function onFetchError(error) {
  return error;
}
