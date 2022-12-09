//
import dataM1 from "/data/data M1.json" assert { type: "json" };
import dataM2 from "/data/data M2.json" assert { type: "json" };

function getData(form) {
  var formData = new FormData(form);
  const submitedData = Object.fromEntries(formData);
  // console.log(dataM1);
  // submitedData {year: '1', semester: '1', day: 'Saturday'}

  if (Object.keys(submitedData).length === 3) {
    if (submitedData["year"] === "1") {
      console.log(dataM1["days"][submitedData["day"]]);
    } else {
      console.log(dataM2["days"][submitedData["day"]]);
    }
  } else {
    console.log(Object.keys(submitedData).length);
  }
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});
