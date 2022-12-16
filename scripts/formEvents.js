//
import dataM1 from "/data/data M1.json" assert { type: "json" };
import dataM2 from "/data/data M2.json" assert { type: "json" };

const data = {
  1: dataM1,
  2: dataM2,
};

function getData(form) {
  var formData = new FormData(form);
  const submitedData = Object.fromEntries(formData);
  console.log(">> submitedData:", submitedData);
  // submitedData {year: '1', semester: '1', day: 'Sunday'; session: '1'}

  if (Object.keys(submitedData).length > 1) {
    // Sessions code
    var sessions = data[submitedData["year"]]["days"][submitedData["day"]];
    console.log(">> sessions:", sessions);
    // [{…}, {…}, {…}, {…}, {…}]
    // 0: {cours: {…}, groups: {…}}
    // ....

    const navBtns = document.getElementById("nav-btns");
    removeChilds(navBtns); // remove all childs of the div
    fillCardPart(submitedData, sessions);

    // making the float-card visible
    const floatCard = document.getElementById("float-card");
    floatCard.style.visibility = "visible";

    for (let index = 0; index < sessions.length; index++) {
      addNavButtons(navBtns, index); // adding the navigation buttons
      // Here we add the buttons + the info of the selected session to the float-card
      // const element = array[index];
    }
  } else {
    // Teachers code
    console.log(">> Not yet; Soon");
    console.log(Object.keys(submitedData).length);
  }
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

function addNavButtons(navBtns, index) {
  // adding the navigation buttons to nav element
  const navBtn = document.createElement("div");
  navBtn.className = "btn nav-btn";
  navBtn.innerText = "Session N-" + (index + 1);
  navBtns.appendChild(navBtn);
}

function fillCardPart(submitedData, sessions) {
  const session = sessions[submitedData["session"]];
  // selecting elements:
  const cardSpec = document.querySelectorAll(".card-spec");
  const cardYear = document.querySelectorAll(".card-year");
  const cardBody = document.querySelector("#card-body");
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
    // '  		<div id="class-div">' +
    // '  			<li>Grp-1: <span id="card-grp1">'+ submitedData[] +'</span></li>' +
    // '  			<li>Grp-2: <span id="card-grp2">'+ submitedData[] +'</span></li>' +
    // "  		</div>" +
    // G1: {Time: '08:00 - 09:30', Subject: 'Anglais', loc: 'LABO LANG', prof: 'BOUDEFASSA'}
    // G2: {Time: '08:00 - 09:30', Subject: 'ABDD', loc: 'TP.C3A', prof: 'KESSI'}
  }
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});

 // session
//  {
//   "cours": {},
//  //
//   "groups": {
//     "G1": {
//       "Time": "14:40 - 16:10",
//       "Subject": "RÃ©solution de problÃ¨mes",
//       "loc": "TP129",
//       "prof": "SEBAI"
//     },
//     "G2": {
//       "Time": "14:40 - 16:10",
//       "Subject": "TAI",
//       "loc": "D5",
//       "prof": "SETITRA"
//     }
//   }
// }

