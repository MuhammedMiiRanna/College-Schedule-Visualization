import teachersData from "/data/teachersSchedule/FacTeachersData.json" assert { type: "json" };
// import M1_IV from "/data/data M1.json" assert { type: "json" };
// import M2_IV from "/data/data M2.json" assert { type: "json" };
import data from "/data/schedulesFile.json" assert { type: "json" };

// const data = {
//   1: M1_IV,
//   2: M2_IV,
// };
const counter = {
  navBtns: false, // this will help in the repeated event issue
};

export const classrooms = {
  // this will help in reseting the colors
  defaultColor: "#fff",
  fillColor: "red",
  id: [],
};

// Main functions
export function getSessionsData(submitedData) {
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

  if (counter.navBtns) {
    // remove the EventListener if there is one
    navBtns.removeEventListener("click", handleSessionSelect);
    counter.navBtns = false;
  }
  // add the EventListener
  navBtns.addEventListener("click", handleSessionSelect);
  counter.navBtns = true;

  function handleSessionSelect(evt) {
    // const sessions = data[submitedData["year"]]["days"][submitedData["day"]];
    submitedData["session"] = parseInt(evt.target.id[3]);
    if (submitedData["session"] === 0 || Boolean(submitedData["session"])) {
      fillFloatCard(submitedData, sessions);
    }
  }
}

export function getTeachersData(submitedData) {
  const teachersDays = teachersData[submitedData["teachers"]]; // workdays of the selected teacher
  const teacherFirstDay = Object.keys(teachersDays)[0];
  // >> submitedData: {teacher: '0'} teacher: "0"[Prototype]]: Object
  // Selection part:
  const teacherCard = document.getElementById("teacher-card");
  const teachersNav = document.getElementById("teachers-nav");
  const weekDays = document.createElement("div");
  const daySessions = document.createElement("div");
  const weekDaysHeading = document.createElement("h2");
  const daySessionsHeading = document.createElement("h2");

  {
    // adding t-nav elements id:
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

  fillTeacherCard(submitedData["teachers"], teachersDays[teacherFirstDay]);
  removeChilds(teachersNav);
  addTeacherNavBtns(
    teachersNav,
    weekDays,
    daySessions,
    teachersDays,
    teacherFirstDay
  );
  teacherCard.style.visibility = "visible"; // making the float-card visible
  teachersNav.style.visibility = "visible";

  weekDays.addEventListener("click", (evt) => {
    const dayIndex = evt.target.id.split("-")[2];
    if (dayIndex !== undefined) {
      removeChilds(daySessions, 1);
      removeChilds(weekDays, 1);
      addTeacherNavBtns(
        teachersNav,
        weekDays,
        daySessions,
        teachersDays,
        dayIndex
      );
      fillTeacherCard(submitedData["teachers"], teachersDays[dayIndex]);
    }
  });

  daySessions.addEventListener("click", (evt) => {
    const dayIndex = document.getElementById("t-card-day").innerText;
    const sessionIndex = evt.target.id.split("-")[2];
    const tSessionIndex = evt.target.innerText;
    if (sessionIndex !== undefined) {
      fillTeacherCard(
        submitedData["teachers"],
        teachersDays[dayIndex],
        sessionIndex,
        tSessionIndex
      );
    }
  });
}

// /////////////// FUNCTIONS section ///////////////
export function removeChilds(element, leaveChild) {
  // element parameter was named navBtns
  // remove last childs of the navBtns element
  leaveChild = typeof leaveChild === "undefined" ? 0 : leaveChild;
  // TODO try this in here: (element.childElementCount !== 0)
  // while (element.hasChildNodes()) {
  if (leaveChild === 0) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  } else {
    while (element.children.length > leaveChild) {
      element.removeChild(element.lastChild);
    }
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

function addTeacherNavBtns(
  teachersNav,
  weekDays,
  daySessions,
  teachersDays,
  teacherFirstDay
) {
  // TODO: check the parameters (too long)
  //adding week days
  for (let key in teachersDays) {
    const tNavBtn = document.createElement("div");
    tNavBtn.id = "week-days-" + key;
    tNavBtn.className = "btn t-nav-btn";
    tNavBtn.innerText = key;
    weekDays.appendChild(tNavBtn);
  }
  // adding day Sessions:
  let index = 0;
  for (let key in teachersDays[teacherFirstDay]) {
    const tSessionNavBtn = document.createElement("div");
    tSessionNavBtn.id = "day-session-" + key;
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
    cardPart.textContent = submitedData["year"].split("_")[1];
  }
  // for (const cardPart of cardYear) {
  //   cardPart.textContent = submitedData["year"];
  // }
  // fill card body
  cardBody.innerHTML =
    "<ul>" +
    ' <li>Year: <span id="card-year">' +
    submitedData["year"] +
    "</span></li>" +
    ' <li>Sem: <span id="card-sem">' +
    submitedData["semester"] +
    "</span></li>" +
    ' <li>Day: <span id="card-day">' +
    submitedData["day"] +
    "</span></li>" +
    ' <li>Session: <span id="card-hour">' +
    (parseInt(submitedData["session"]) + parseInt(1)) +
    "</span></li>" +
    "</ul>";

  // console.log(">> sessions", sessions);
  // console.log(">> session", session);
  // console.log('>> submitedData["session"]: ', submitedData["session"]);
  // submitedData {year: '1', semester: '1', day: 'Sunday'; session: '1'}
  if (parseInt(submitedData["session"]) + 1 > sessions.length) {
    // Sec available ?
    var notAvailText;
    const notAvail = document.createElement("li");

    notAvailText =
      sessions.length === 0 ? "PS: Day's-off" : "PS: Done for today";
    fillClassrooms([]);
    notAvail.innerText = notAvailText;
    cardBody.firstElementChild.appendChild(notAvail);

    console.error();
    (">> PS: Section is Not available"); // u can use alert
    return;
  }

  if (Object.keys(session["cours"]).length > 0) {
    // normal class
    const cour = session["cours"];
    const classElem = document.createElement("li");
    // classElem.id = class-div;
    const classList = document.createElement("ul");
    for (let key in cour) {
      const li = document.createElement("li");
      li.innerText = key + ": " + cour[key];
      classList.appendChild(li);
    }
    classElem.appendChild(classList);
    // append the last child (either class or groups)
    cardBody.firstElementChild.appendChild(classElem);
    fillClassrooms([cour["loc"]]);
  } else {
    // groups
    const groups = session["groups"]; // groups ==> {G1:{}, G2:{}}
    const locals = [];
    for (const grp in groups) {
      // grp ==> G1, G2 ...
      locals.push(groups[grp]["loc"]);
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
    fillClassrooms(locals);
  }
}

function fillTeacherCard(
  tName,
  sessionData,
  sessionIndex = Object.keys(sessionData)[0],
  tSessionIndex = 1
) {
  const cardBody = document.querySelector("#t-card-body");
  // fill card body
  cardBody.innerHTML =
    "<ul>" +
    '  <li>Teacher: <span id="t-card-name">' +
    tName +
    "</span></li>" +
    '  <li>Day: <span id="t-card-day">' +
    sessionData[sessionIndex]["day"] +
    "</span></li>" +
    '  <li>Session: <span id="t-card-session">' +
    tSessionIndex +
    "</span></li>" +
    '  <li>Time: <span id="t-card-session">' +
    sessionData[sessionIndex]["session_num"] +
    " " +
    sessionData[sessionIndex]["session"] +
    "</span></li>" +
    '  <li>classroom: <span id="t-card-classroom">' +
    sessionData[sessionIndex]["classroom"] +
    "</span></li>" +
    '  <li>Section: <span id="t-card-section">' +
    sessionData[sessionIndex]["section"].split("_").join(" ") +
    "</span></li>" +
    '  <li>Module: <span id="t-card-module">' +
    sessionData[sessionIndex]["module"] +
    "</span></li>" +
    "</ul>";
  fillClassrooms([sessionData[sessionIndex]["classroom"]]);
}

export function fillClassrooms(ids) {
  let classroom;
  let coords = [];
  //
  // const test = d3.select("[id='426D']")[0][0].style = "fill: #fff";
  for (const id of classrooms.id) {
    // d3.select("[id='" + id + "']")[0][0].style = "fill: " + classrooms.defaultColor;
    document.getElementById(id).style = "fill: " + classrooms.defaultColor;
    console.log(id + " cleared!!!");
  }
  classrooms.id.length = 0;
  for (const id of ids) {
    // d3.select("[id='" + id + "']")[0][0].style = "fill: " + classrooms.fillColor;
    classroom = document.getElementById(id);
    if (classroom !== null) {
      classroom.style = "fill: " + classrooms.fillColor;
      classrooms.id.push(id);
      console.log(id + " has been filled!");
    } else {
      console.error(`Classroom ${id} not found in the map`);
      alert(`Classroom ${id} not found in the map.......`);
    }

    if (classroom !== null) {
      let pathData = classroom.getAttribute("d");
      let numericValues = pathToNumerical(pathData);
      coords = [...coords, ...numericValues];
      console.log(coords);
      zoomTo(coords, 6);
    } else {
      console.error(`Classroom ${id} not found in the map to change it color!`);
    }
    //
    function pathToNumerical(pathData) {
      const numericRegex = /[-+]?\d*\.?\d+/g;
      const alphaNumValues = pathData.match(numericRegex);
      let numericValues = [];
      for (let index = 0; index < alphaNumValues.length; index += 2) {
        numericValues.push([
          parseFloat(alphaNumValues[index]),
          parseFloat(alphaNumValues[index + 1]),
        ]);
      }
      return numericValues;
    }
  }
}

function zoomTo(points, scale) {
  const zoom = d3
    .zoom()
    .scaleExtent([1, 25])
    .translateExtent([
      [-100, -100],
      [1000, 900],
    ])
    .on("zoom", zoomed);

  function zoomed() {
    svg.selectAll("path").attr("transform", d3.event.transform);
    //console.log(d3.event.transform)
  }

  // centroid isn't defined wth? TODO:
  let point = centroid(points);
  //convert long lat to cartesian coordinates
  console.log("cartesian point is:", point);
  svg
    .transition()
    .duration(2500)
    .call(
      zoom.transform,
      d3.zoomIdentity
        .translate(W / 2 - point[0] * scale, H / 2 - point[1] * scale)
        .scale(scale)
    );
}
