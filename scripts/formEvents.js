//
import dataM1 from "/data/data M1.json" assert { type: "json" };
import dataM2 from "/data/data M2.json" assert { type: "json" };
import teachersData from "/data/teachersData.json" assert { type: "json" };


const data = {
  1: dataM1,
  2: dataM2,
};


// Main functions
function getSessionsData(form) {
  // named changed from getData
  var formData = new FormData(form);
  const submitedData = Object.fromEntries(formData); // getting form data 
  const sessions = data[submitedData["year"]]["days"][submitedData["day"]];
  // submitedData {year: '1', semester: '1', day: 'Sunday'; session: '1'}
  console.log(">> submitedData:", submitedData);
  console.log(">> sessions:", sessions);

  // if (Object.keys(submitedData).length > 1) {
  // Selecting elements + the needed data
  const navBtns = document.getElementById("nav-btns");
  const floatCard = document.getElementById("float-card");

  removeChilds(navBtns); // remove all childs of the div
  fillFloatCard(submitedData, sessions); // add the info of the selected session to the float-card
  addNavButtons(navBtns, sessions.length, submitedData,); // adding the navigation buttons
  floatCard.style.visibility = "visible"; // making the float-card visible

  navBtns.addEventListener('click', getSessionData); // add the EventListener
  function getSessionData(evt) {
    console.log('A Session Button was clicked: ' + evt.target.id[3]); // debug purposes
    submitedData["session"] = parseInt(evt.target.id[3]);
    fillFloatCard(submitedData, sessions)
  }


}

function getTeachersData(form) {
  var formData = new FormData(form); // getting form data (into object)
  const submitedData = Object.fromEntries(formData);
  const teachersList = Object.keys(teachersData);
  const teachersDays = teachersData[teachersList[submitedData['teachers']]]; // getting the days where the selected teachers will have classes
  const teacherFirstDaySessions = Object.keys(teachersDays)[0];
  // >> submitedData: {teacher: '0'} teacher: "0"[Prototype]]: Object

  // Selection part:
  const teachersNav = document.getElementById('teachers-nav');
  const weekDays = document.createElement('div');
  const daySessions = document.createElement('div');
  const weekDaysHeading = document.createElement('h2');
  const daySessionsHeading = document.createElement('h2');

  {// adding t-nav elements id:
    weekDays.id = "week-days";
    daySessions.id = "day-sessions";

    // add headings :
    weekDaysHeading.innerText = "Days";
    daySessionsHeading.innerText = "N-:";
    // append the headings
    weekDays.appendChild(weekDaysHeading);
    daySessions.appendChild(daySessionsHeading);
  }

  // TODO: rigel sessions id (
  // - like asq tebda mel 0 or mel 1
  // - and asq yselecti session li rah yafichiha bel innerText 
  //    or bel id li ykon 0 or bel id li ykon 3la hsab number te3 session.
  // TODO: consider changing the values of the teachers in the form to their names.
  // (from evernote todo list)
  // adding weekDays
  let index = 0;
  for (let key in teachersDays) {
    const tNavBtn = document.createElement('div');
    tNavBtn.id = 'week-days-' + index++;
    tNavBtn.className = "btn t-nav-btn";
    tNavBtn.innerText = key;
    weekDays.appendChild(tNavBtn);
  }
  // adding daySessions
  index = 0;
  console.log(">> teacherFirstDaySessions:", teacherFirstDaySessions);
  console.log(">> teachersDays[teacherFirstDaySessions]:", teachersDays[teacherFirstDaySessions]);
  for (let key in teachersDays[teacherFirstDaySessions]) {
    const tSessionNavBtn = document.createElement('div');
    tSessionNavBtn.id = 'day-session-' + key++;
    tSessionNavBtn.className = "btn t-session-nav-btn";
    tSessionNavBtn.innerText = index++;
    daySessions.appendChild(tSessionNavBtn);
  }

  // 
  removeChilds(teachersNav);
  teachersNav.appendChild(weekDays);
  teachersNav.appendChild(daySessions);
  teachersNav.style.visibility = "visible"
}

//
// /////////////// FUNCTIONS section ///////////////
//

function removeChilds(navBtns) {
  // remove all childs of the navBtns element
  while (navBtns.firstChild) {
    navBtns.removeChild(navBtns.firstChild);
  }
}

function addNavButtons(navBtns, length, submitedData) {
  // adding the navigation buttons to nav element
  for (let index = 0; index < length; index++) {
    const navBtn = document.createElement("div");
    navBtn.className = "btn nav-btn";
    navBtn.id = "btn" + index;
    navBtn.innerText = "Session N-" + (index + 1);
    navBtns.appendChild(navBtn);
  }
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
    "  <ul>" +
    '  		<li>Year: <span id="card-year">' + submitedData["year"] + '</span></li>' +
    '  		<li>Sem: <span id="card-sem">' + submitedData["semester"] + '</span></li>' +
    '  		<li>Day: <span id="card-day">' + submitedData["day"] + '</span></li>' +
    '  		<li>Session: <span id="card-hour">' + (parseInt(submitedData["session"]) + parseInt(1)) + '</span></li>' +
    "  	</ul>";

  // fill card-body
  if (parseInt(submitedData["session"]) + 1 > sessions.length) {
    var notAvailText;
    (sessions.length === 0) ? notAvailText = "PS: Day's-off" : notAvailText = "PS: Done for today";
    console.log(">> PS: Section is Not available");
    // alert(">> PS: Section is Not available");
    const notAvail = document.createElement("li");
    notAvail.innerText = notAvailText;
    cardBody.firstElementChild.appendChild(notAvail);
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
      grpElem.innerText = grp; // <li> g1
      const grpul = document.createElement("ul");
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

// EventListeners section:
// event test
// document.getElementById("nav-btns").addEventListener("click", function (evt) {
//   console.log('A Session Button was clicked: ' + evt.target.id);
// });

// document.getElementById("form").addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   const formElem = document.getElementById("form");
//   console.log("formElem", form);
//   console.log("evt.target", evt.target);
//   getData(evt.target);
// });

document.getElementById("schedule-submit").addEventListener("click", function (evt) {
  evt.preventDefault();
  getSessionsData(document.getElementById("sessionsForm"));
});

document.getElementById("teachers-submit").addEventListener("click", function (evt) {
  evt.preventDefault();
  getTeachersData(document.getElementById("teachersForm"));
});

document.getElementById("schedule-clear").addEventListener("click", function (evt) {
  document.getElementById('float-card').style.visibility = "hidden";
  removeChilds(document.getElementById('nav-btns'));
  console.log("Page Cleared!!");
});


