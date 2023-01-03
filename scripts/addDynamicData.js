import teachersData from "/data/teachersSchedule/FacTeachersData.json" assert { type: "json" };
import schedules from "/data/schedulesFileNames.json" assert { type: "json" };
import eventsData from "/data/events.json" assert { type: "json" };

// [ 'radius', 1 ]
// [ 'draw', [Function: draw] ]
// adding specialities data (years)
const year = document.getElementById('year');
for (let entry of Object.entries(schedules)) {
    const option = document.createElement('option');
    option.innerHTML = entry[0].split("_").join(" ");
    option.value = entry[0];
    year.appendChild(option);
}
// console.log("specialities options list has been loaded !!");

// adding teachers data (names)
const teachers = document.getElementById('teachers');
for (let tName of Object.keys(teachersData)) {
    const option = document.createElement('option');
    option.innerHTML = tName;
    option.value = tName; // that will make it easy for us to extract teachers data
    teachers.appendChild(option);
}
// console.log("Teachers options list has been loaded !!");

// adding events data (names)
const events = document.getElementById('events');
for (let eventName of Object.keys(eventsData)) {
    const option = document.createElement('option');
    option.innerText = eventName;
    option.value = eventName;
    events.appendChild(option);
}
// console.log("events options list has been loaded !!");