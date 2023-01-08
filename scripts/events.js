import events from "/data/eventsData.json" assert { type: "json" };

// we may need to move this into addDynamicData to be filled there 

export const showsBy = {
    "Orginizer": [
        "TedEx",
        "cisco"
    ],
    "Date": [
        "upComing",
        "Current",
        "missed"
    ],
    "Name": null,
    "Type": [
        "internal",
        "external"
    ],
    "Fields": [
        "Computer Science",
        "AI",
        "Network",
        "Hackathon",
        "Showcase",
        "workshops",
        "Talks",
        "Physics",
        "Chemistry",
        "Biology",
        "engineering",
        "Public speaking",
        "Self-dev",
        "Others"
    ],
    "Scale": {
        "guests < 50": 50,
        "guests < 100": 100,
        "guests < 500": 500,
        "guests < 1000": 1000,
        "guests < 2000": 1000,
        "guests > 2000": null,
        "Unknown": undefined
    },
    "Location": []
}

export function getEventsData(submitedData) {

    return;
}

function fillFloatCard() {

    return;
}
export function fillSelectedTypeList(selectedOption) {
    const selectedType = document.getElementById('selectedType');
    let type;
    Array.isArray(showsBy[selectedOption]) ? type = showsBy[selectedOption] : type = Object.keys(showsBy[selectedOption]);
    // const type = showsBy[selectedOption];
    for (let value of type) {
        const option = document.createElement('option');
        option.innerText = value;
        option.value = value;
        selectedType.appendChild(option);
    }
}

// <ul>
//     <li>Event: <span id="event-name"></span></li>
//     <li>Orginizer: <span id="event-orginizer"></span></li>
//     <li>Location: <span id="event-location"></span></li>
//     <li>Date: <span id="event-date"></span></li>
//     <li>what's about ?: <br><span id="event-descreption"></span></li>
// </ul>


// {
//     "formation": {
//       "name": "formation",
//       "orginizer": "cisco",
//       "location": "auditorium",
//       "year": "2022",
//       "month": "12",
//       "day": "26",
//       "descreption": "taht's the descreption of the"
//     },