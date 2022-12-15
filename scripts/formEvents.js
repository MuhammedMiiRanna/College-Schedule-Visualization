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
  // console.log(dataM1);
  console.log(submitedData);
  // submitedData {year: '1', semester: '1', day: 'Sunday'; timing: '1'}

  if (Object.keys(submitedData).length > 1) {
    var sessions = data[submitedData["year"]]["days"][submitedData["day"]];
    console.log(">>", sessions);
    // [{…}, {…}, {…}, {…}, {…}]
    // 0: {cours: {…}, groups: {…}}
    // ....

    const navBtns = document.getElementById("nav-btns");
    removeChilds(navBtns); // remove all childs of the div

    for (let index = 0; index < sessions.length; index++) {
      addNavButtons(navBtns, index); // adding the navigation buttons

      const floatCard = document.getElementById("float-card");
      floatCard.style.visibility = "visible";

      // + check with the card content dynamic insertion
      const cardSpec = document.querySelector(".card-spec");
      const cardYear = document.querySelector(".card-year");
      console.log(cardYear);
      console.log(cardSpec);
      cardSpec.innerText = "Master";
      cardYear.innerText = submitedData["year"];

      // cardYear[0] = submitedData["year"];
      // cardYear[1] = submitedData["year"];
      // cardSpec[0] = "Master";
      // cardSpec[1] = "Master";

      // const cardBody = document.getElementById("card-body");
      // cardSpec.innerText = "Master";
      // cardYear.innerText = submitedData["year"];
      // cardBody.innerText = "";

      // <ul>
      // 		<li>Year: <span id="card-year"></span></li>
      // 		<li>Sem: <span id="card-sem"></span></li>
      // 		<li>Day: <span id="card-day"></span></li>
      // 		<li>Hour: <span id="card-hour"></span></li>
      // 		<div id="class-div">
      // 			<li>Class: <span id="card-class"></span></li>
      // 		</div>
      // 		<div id="class-div">
      // 			<li>Grp-1: <span id="card-grp1"></span></li>
      // 			<li>Grp-2: <span id="card-grp2"></span></li>
      // 		</div>
      // 	</ul>

      // Here we add the buttons + the info of the selected session to the float-card
      // const element = array[index];
    }
  } else {
    // Teachers code
    console.log(">> Not yet; Soon");
    console.log(Object.keys(submitedData).length);
  }
}

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

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});
