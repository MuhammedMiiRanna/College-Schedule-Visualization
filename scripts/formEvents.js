
import { removeChilds, getTeachersData, getSessionsData } from './formsLib.js';


document.getElementById("schedule-submit").addEventListener("click", function (evt) {
  evt.preventDefault();
  const form = document.getElementById("sessionsForm");
  var formData = new FormData(form);
  const submitedData = Object.fromEntries(formData); // getting form data 
  document.getElementById('teacher-card').style.visibility = "hidden";
  removeChilds(document.getElementById('teachers-nav'));
  getSessionsData(submitedData);
});

document.getElementById("teachers-submit").addEventListener("click", function (evt) {
  evt.preventDefault();
  const form = document.getElementById("teachersForm")
  var formData = new FormData(form); // getting form data (into object)
  const submitedData = Object.fromEntries(formData);
  document.getElementById('float-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  getTeachersData(submitedData);
});

document.getElementById("schedule-clear").addEventListener("click", function (evt) {
  document.getElementById('float-card').style.visibility = "hidden";
  document.getElementById('teacher-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  removeChilds(document.getElementById('teachers-nav'));
  console.log("Page Cleared!!");
});

document.getElementById("eventsSubmit").addEventListener("click", function (evt) {
  evt.preventDefault();
  const form = document.getElementById("eventsForm")
  var formData = new FormData(form); // getting form data (into object)
  const submitedData = Object.fromEntries(formData);
  document.getElementById('float-card').style.visibility = "hidden";
  document.getElementById('teacher-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  removeChilds(document.getElementById('teachers-nav'));
  console.log("submitedData", submitedData);
  // getEventData(submitedData);
  // TODO create this function
  // TODO create hideAll li dir had khedma =+> 
  //  - document.getElementById('float-card').style.visibility = "hidden";
  //  - document.getElementById('teacher-card').style.visibility = "hidden";
  //  - removeChilds(document.getElementById('nav-btns'));
  //  - removeChilds(document.getElementById('teachers-nav'));
});

// TODO: Next time try to chnage the 2nd form input according to the first input  
// https://code.mu/en/javascript/book/prime/dom/form/select/selected-item-changing/