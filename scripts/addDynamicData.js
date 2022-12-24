import teachersData from "/data/FacTeachersData.json" assert { type: "json" };
// import teachersData from "/data/teachersData.json" assert { type: "json" };

let index = 0;
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