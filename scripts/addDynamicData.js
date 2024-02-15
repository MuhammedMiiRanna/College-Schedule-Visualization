import teachersData from "/data/teachersSchedule/FacTeachersData.json" assert { type: "json" };
import schedules from "/data/schedulesFileNames.json" assert { type: "json" };
import eventsData from "/data/eventsData.json" assert { type: "json" };
import { showsBy, fillSelectedTypeList } from "/scripts/events.js";

// [ 'radius', 1 ]
// [ 'draw', [Function: draw] ]
// adding SPECIALITIES data (years)
const year = document.getElementById("year");
for (let entry of Object.entries(schedules)) {
  const option = document.createElement("option");
  option.innerHTML = entry[0].split("_").join(" ");
  option.value = entry[0];
  year.appendChild(option);
}
// console.log("specialities options list has been loaded !!");

// TEACHERS data (names)
const teachers = document.getElementById("teachers");
for (let tName of Object.keys(teachersData)) {
  const option = document.createElement("option");
  option.innerHTML = tName;
  option.value = tName; // that will make it easy for us to extract teachers data
  teachers.appendChild(option);
}
// console.log("Teachers options list has been loaded !!");

// // ShowsBy Data:
// // <!-- FOR THE NEXT PROJECT --
// const showsByTypes = document.getElementById("showsBy");
// for (let type of Object.keys(showsBy)) {
//   const option = document.createElement("option");
//   option.innerText = type;
//   option.value = type;
//   showsByTypes.appendChild(option);
// }

// // TODO add lower method
// // EVENTS data (names)
// const selectedOption = showsByTypes.firstElementChild.innerText;
// fillSelectedTypeList(selectedOption);
// // for (let value of type) {
// //     const option = document.createElement('option');
// //     option.innerText = value;
// //     option.value = value;
// //     selectedType.appendChild(option);
// //     option.classList.add("showsByOption");
// // }
