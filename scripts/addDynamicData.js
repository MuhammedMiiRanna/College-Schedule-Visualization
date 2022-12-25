import teachersData from "/data/teachersSchedule/FacTeachersData.json" assert { type: "json" };
import schedules from "/data/schedulesFileNames.json" assert { type: "json" };

// [ 'radius', 1 ]
// [ 'draw', [Function: draw] ]
let index = 0;
const year = document.getElementById('year');
for (let entry of Object.entries(schedules)) {
    const option = document.createElement('option');
    option.innerHTML = entry[0].split("_").join(" ");
    option.value = entry[0];
    year.appendChild(option);
    index++;
}

index = 0;
const teachers = document.getElementById('teachers');
for (let key of Object.keys(teachersData)) {
    const option = document.createElement('option');
    option.innerHTML = key;
    option.value = key; // that will make it easy for us to extract teachers data
    // option.value = index;
    teachers.appendChild(option);
    index++;
}
// console.log("Teachers options list has been loaded !!");
