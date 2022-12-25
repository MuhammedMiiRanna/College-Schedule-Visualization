import teachersData from "/data/teachersSchedule/FacTeachersData.json" assert { type: "json" };
import M1_IV from "/data/data M1.json" assert { type: "json" };
import M2_IV from "/data/data M2.json" assert { type: "json" };

const data = {
  1: M1_IV,
  2: M2_IV,
};


// Main functions
function getSessionsData(submitedData) {
  // Selecting elements + the needed data
  const sessions = data[submitedData["year"]]["days"][submitedData["day"]];
  // sessions: (5) [{…}, {…}, {…}, {…}, {…}]
  // submitedData {year: '1', semester: '1', day: 'Sunday'; session: '1'}
  const navBtns = document.getElementById("nav-btns");
  const floatCard = document.getElementById("float-card");

  removeChilds(navBtns); // remove all childs of the div
  fillFloatCard(submitedData, sessions); // add the info of the selected session to the float-card
  addNavButtons(navBtns, sessions.length); // adding the navigation buttons
  floatCard.style.visibility = "visible"; // making the float-card visible

  navBtns.addEventListener('click', function (evt) { // add the EventListener
    // const sessions = data[submitedData["year"]]["days"][submitedData["day"]];
    // console.log("sessions", sessions);
    console.log("submitedData", submitedData);
    submitedData["session"] = parseInt(evt.target.id[3]);
    fillFloatCard(submitedData, sessions);
  });
}

function getTeachersData(form) {
  var formData = new FormData(form); // getting form data (into object)
  const submitedData = Object.fromEntries(formData);
  const teachersDays = teachersData[submitedData["teachers"]]; // workdays of the selected teacher
  const teacherFirstDay = Object.keys(teachersDays)[0];
  // >> submitedData: {teacher: '0'} teacher: "0"[Prototype]]: Object
  // Selection part:
  const teacherCard = document.getElementById("teacher-card");
  const teachersNav = document.getElementById('teachers-nav');
  const weekDays = document.createElement('div');
  const daySessions = document.createElement('div');
  const weekDaysHeading = document.createElement('h2');
  const daySessionsHeading = document.createElement('h2');

  {// adding t-nav elements id:
    // TODO check the functionlity of the other function ??
    weekDays.id = "week-days";
    daySessions.id = "day-sessions";

    // add headings :
    weekDaysHeading.innerText = "Days";
    daySessionsHeading.innerText = "N-:";
    // append the headings
    weekDays.appendChild(weekDaysHeading);
    daySessions.appendChild(daySessionsHeading);
  }

  fillTeacherCard(teachersDays[teacherFirstDay]);
  removeChilds(teachersNav);
  addTeacherNavBtns(teachersNav, weekDays, daySessions, teachersDays, teacherFirstDay);
  teacherCard.style.visibility = "visible"; // making the float-card visible
  teachersNav.style.visibility = "visible";

  weekDays.addEventListener('click', function (evt) {
    const dayIndex = evt.target.id.split("-")[2];
    removeChilds(daySessions, 1);
    removeChilds(weekDays, 1);
    addTeacherNavBtns(teachersNav, weekDays, daySessions, teachersDays, dayIndex);
    fillTeacherCard(teachersDays[dayIndex]);
  });

  daySessions.addEventListener('click', function (evt) {
    const dayIndex = document.getElementById('t-card-day').innerText;
    const sessionIndex = evt.target.id.split("-")[2];
    const tSessionIndex = evt.target.innerText;
    fillTeacherCard(teachersDays[dayIndex], sessionIndex, tSessionIndex);
  });
}

// /////////////// FUNCTIONS section ///////////////
function removeChilds(navBtns, leaveChild) {
  // remove last childs of the navBtns element
  leaveChild = typeof leaveChild === 'undefined' ? 0 : leaveChild;
  while (navBtns.childNodes.length > leaveChild) {
    navBtns.removeChild(navBtns.lastChild);
  }
}

function addNavButtons(navBtns, length) {
  // adding the navigation buttons to nav element
  for (let index = 0; index < length; index++) {
    const navBtn = document.createElement("div");
    navBtn.className = "btn nav-btn";
    navBtn.id = "btn" + index;
    navBtn.innerText = "Session N-" + (index + 1);
    navBtns.appendChild(navBtn);
  }
}

function addTeacherNavBtns(teachersNav, weekDays, daySessions, teachersDays, teacherFirstDay) {
  // TODO: check the parameters (too long)
  //adding week days
  for (let key in teachersDays) {
    const tNavBtn = document.createElement('div');
    tNavBtn.id = 'week-days-' + key;
    tNavBtn.className = "btn t-nav-btn";
    tNavBtn.innerText = key;
    weekDays.appendChild(tNavBtn);
  }
  // adding day Sessions:
  let index = 0;
  for (let key in teachersDays[teacherFirstDay]) {
    const tSessionNavBtn = document.createElement('div');
    tSessionNavBtn.id = 'day-session-' + key;
    tSessionNavBtn.className = "btn t-session-nav-btn";
    tSessionNavBtn.innerText = ++index;
    daySessions.appendChild(tSessionNavBtn);
  }
  teachersNav.appendChild(weekDays);
  teachersNav.appendChild(daySessions);
}

function fillFloatCard(submitedData, sessions) {
  // submitedData ==> obj of form infos
  // sessions ==> list of sessions content obj
  // selecting elements:
  const session = sessions[submitedData["session"]];
  const cardSpec = document.querySelectorAll(".card-spec");
  const cardYear = document.querySelectorAll(".card-year");
  const cardBody = document.querySelector("#float-card-body");
  // fill card head
  for (const cardPart of cardSpec) {
    cardPart.textContent = "Master";
  }
  for (const cardPart of cardYear) {
    cardPart.textContent = submitedData["year"];
  }
  // fill card body
  cardBody.innerHTML =
    "<ul>" +
    ' <li>Year: <span id="card-year">' + submitedData["year"] + '</span></li>' +
    ' <li>Sem: <span id="card-sem">' + submitedData["semester"] + '</span></li>' +
    ' <li>Day: <span id="card-day">' + submitedData["day"] + '</span></li>' +
    ' <li>Session: <span id="card-hour">' + (parseInt(submitedData["session"]) + parseInt(1)) + '</span></li>' +
    "</ul>";

  // console.log(">> sessions", sessions);
  // console.log(">> session", session);
  // console.log('>> submitedData["session"]: ', submitedData["session"]);
  // submitedData {year: '1', semester: '1', day: 'Sunday'; session: '1'}
  if (parseInt(submitedData["session"]) + 1 > sessions.length) { // Sec available ?
    var notAvailText;
    const notAvail = document.createElement("li");

    notAvailText = (sessions.length === 0) ? "PS: Day's-off" : "PS: Done for today";
    notAvail.innerText = notAvailText;
    cardBody.firstElementChild.appendChild(notAvail);

    console.log(">> PS: Section is Not available"); // u can use alert
    return;
  }

  if (Object.keys(session["cours"]).length > 0) { // normal class
    const classElem = document.createElement("li");
    // classElem.id = class-div;
    const classList = document.createElement("ul");
    for (let key in session["cours"]) {
      const li = document.createElement("li");
      li.innerText = key + ": " + session["cours"][key];
      classList.appendChild(li);
    }
    classElem.appendChild(classList);
    // append the last child (either class or groups)
    cardBody.firstElementChild.appendChild(classElem);
  } else { // groups
    const groups = session["groups"]; // groups ==> {G1:{}, G2:{}}
    for (const grp in groups) { // grp ==> G1, G2
      const grpElem = document.createElement("li"); // <li>
      const grpul = document.createElement("ul");
      grpElem.innerText = grp; // <li> g1
      for (let key in groups[grp]) {
        const li = document.createElement("li");
        li.innerText = key + ": " + groups[grp][key];
        grpul.appendChild(li); // <li> g1
      }
      grpElem.appendChild(grpul); // <li> g1 <ul> <li>
      cardBody.firstElementChild.appendChild(grpElem);
    }
  }
}

function fillTeacherCard(sessionData, sessionIndex = Object.keys(sessionData)[0], tSessionIndex = 1) {
  const cardBody = document.querySelector("#t-card-body");
  // fill card body
  cardBody.innerHTML =
    '<ul>' +
    '  <li>Day: <span id="t-card-day">' + sessionData[sessionIndex]["day"] + '</span></li>' +
    '  <li>Session: <span id="t-card-session">' + tSessionIndex + '</span></li>' +
    '  <li>Time: <span id="t-card-session">' + sessionData[sessionIndex]["session_num"] + " " + sessionData[sessionIndex]["session"] + '</span></li>' +
    '  <li>Section: <span id="t-card-section">' + sessionData[sessionIndex]["section"].split("_").join(" ") + '</span></li>' +
    '  <li>Module: <span id="t-card-module">' + sessionData[sessionIndex]["module"] + '</span></li>' +
    '</ul>';
}

// EventListener's section:
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
  document.getElementById('float-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  getTeachersData(document.getElementById("teachersForm"));
});

document.getElementById("schedule-clear").addEventListener("click", function (evt) {
  document.getElementById('float-card').style.visibility = "hidden";
  document.getElementById('teacher-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  removeChilds(document.getElementById('teachers-nav'));
  console.log("Page Cleared!!");
});



