import { removeChilds, getTeachersData } from "./formsLib.js";
import { getSessionsData, fillClassrooms } from "./formsLib.js";
import eventsData from "/data/eventsData/eventsData.json" assert { type: "json" };
import { getEventsData, fillSelectedTypeList } from "./events.js";

// SVGs :
// const svgElements = document.querySelector('svg');
document.querySelector("svg").addEventListener("click", (evt) => {
  console.log("Local: " + evt.target.id);
});

// // preventDefault behaviour for all buttons
// document.getElementsByClassName('submit')
// prevent Default in one place

// SCHEDULES:
document.getElementById("schedule-submit").addEventListener("click", (evt) => {
  evt.preventDefault();
  const form = document.getElementById("sessionsForm");
  var formData = new FormData(form);
  const submitedData = Object.fromEntries(formData); // getting form data
  document.getElementById("teacher-card").style.visibility = "hidden";
  document.getElementById("events-card").style.visibility = "hidden";
  removeChilds(document.getElementById("teachers-nav"));
  removeChilds(document.getElementById("events-card"));
  getSessionsData(submitedData);
});

// TEACHERS:
document.getElementById("teachers-submit").addEventListener("click", (evt) => {
  evt.preventDefault();
  const form = document.getElementById("teachersForm");
  var formData = new FormData(form); // getting form data (into object)
  const submitedData = Object.fromEntries(formData);
  document.getElementById("float-card").style.visibility = "hidden";
  document.getElementById("events-card").style.visibility = "hidden";
  removeChilds(document.getElementById("nav-btns"));
  removeChilds(document.getElementById("events-card"));
  getTeachersData(submitedData);
});

// CLEAR:
document
  .getElementById("schedule-clear")
  .addEventListener("click", function (evt) {
    document.getElementById("float-card").style.visibility = "hidden";
    document.getElementById("teacher-card").style.visibility = "hidden";
    fillClassrooms([]);
    removeChilds(document.getElementById("nav-btns"));
    removeChilds(document.getElementById("teachers-nav"));
    removeChilds(document.getElementById("events-card"));
    console.log("Page Cleared!!");
  });

// // EVENTS:
// // Submitting the events form:
// document.getElementById("events").addEventListener("click", function (evt) {
//   evt.preventDefault();
//   const form = document.getElementById("eventsForm")
//   var formData = new FormData(form); // getting form data (into object)
//   const submitedData = Object.fromEntries(formData);
//   document.getElementById('float-card').style.visibility = "hidden";
//   document.getElementById('teacher-card').style.visibility = "hidden";
//   removeChilds(document.getElementById('nav-btns'));
//   removeChilds(document.getElementById('teachers-nav'));
//   removeChilds(document.getElementById('events-card-body'));
//   console.log(">> submitedData: ", submitedData);
//   getEventsData(submitedData);
//   // getEventData(submitedData);
//   // TODO create this function
//   // TODO create hideAll li dir had khedma =+>
//   //  - document.getElementById('float-card').style.visibility = "hidden";
//   //  - document.getElementById('teacher-card').style.visibility = "hidden";
//   //  - removeChilds(document.getElementById('nav-btns'));
//   //  - removeChilds(document.getElementById('teachers-nav'));
// });

// // changing the type options
// document.getElementById("showsBy").addEventListener("click", function (evt) {
//   var selectedOption = evt.target.options[evt.target.selectedIndex].innerHTML;
//   removeChilds(document.getElementById("selectedType"));
//   fillSelectedTypeList(selectedOption, eventsData);
// });

// TODO Next time try to chnage the 2nd form input according to the first input
// https://code.mu/en/javascript/book/prime/dom/form/select/selected-item-changing/
// showsBy events:
