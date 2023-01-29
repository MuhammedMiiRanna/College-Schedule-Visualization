import eventsData from "/data/eventsData.json" assert { type: "json" };
import { fillClassrooms } from './formsLib.js';

// we may need to move this into addDynamicData to be filled there 
// >> submitedData:  {showsBy: 'Orginizer', selectedType: 'TedEx'}

export const showsBy = {
    "Orginizer": [
        "TedEx",
        "cisco"
    ],
    "Name": null
    // ,
    // "Date": [
    //     "upComing",
    //     "Current",
    //     "missed"
    // ],
    // "Type": [
    //     "internal",
    //     "external"
    // ],
    // "Fields": [
    //     "Computer Science",
    //     "AI",
    //     "Network",
    //     "Hackathon",
    //     "Showcase",
    //     "workshops",
    //     "Talks",
    //     "Physics",
    //     "Chemistry",
    //     "Biology",
    //     "engineering",
    //     "Public speaking",
    //     "Self-dev",
    //     "Others"
    // ],
    // "Scale": {
    //     "guests < 50": 50,
    //     "guests < 100": 100,
    //     "guests < 500": 500,
    //     "guests < 1000": 1000,
    //     "guests < 2000": 1000,
    //     "guests > 2000": null,
    //     "Unknown": undefined
    // },
    // "Location": [
    //     "central library",
    //     "CRI",
    //     "auditorium",
    //     "CS dep library",
    //     "FSTGAT library"
    // ]
}

export function fillSelectedTypeList(selectedOption, eventsData) {
    const selectedType = document.getElementById('selectedType');
    let type;

    switch (selectedOption) {
        case "Name":
            type = [];
            for (let item in eventsData) {
                type.push(eventsData[item]["name"]);
            }
            break;

        //  fall-through feature of the switch statement
        case "Orginizer":
        case "Date":
        case "Type":
        case "Fields":
        case "Scale":
        case "Location":
            type = Array.isArray(showsBy[selectedOption]) ? showsBy[selectedOption] : Object.keys(showsBy[selectedOption]);
            break;

        default:
            console.log("SORRY ITS DEFAULT");
            break;
    }
    // const type = showsBy[selectedOption];
    for (let value of type) {
        const option = document.createElement('option');
        option.innerText = value;
        option.value = value;
        selectedType.appendChild(option);
    }
}

// >> submitedData:  {showsBy: 'Orginizer', selectedType: 'TedEx'}

export function getEventsData(submitedData) {
    switch (submitedData["showsBy"]) {
        case "Name":
            fillEventCard(eventsData[submitedData["selectedType"]]);

        case "Orginizer":
            // eventName : "formation"
            for (const eventName in eventsData) {
                if (eventsData[eventName]["orginizer"]) {
                    fillEventCard(eventsData[eventName]);
                }
            }
            break;
        case "Type":
        case "Fields":
        case "Date":
        case "Scale":
        case "Location":
        default:
            console.log("SORRY ITS DEFAULT § NOT AVAILABLE YET");
            break;
    }
    document.getElementById('events-card').style.visibility = "visible";
}

function fillEventCard(eventData) {
    console.log(">> ", eventData);
    const cardBody = document.getElementById("events-card-body");
    cardBody.innerHTML = " ";
    cardBody.innerHTML =
        '<ul>' +
        '  <li>name: <span id="event-card-name">' + eventData["name"] + '</span></li>' +
        '  <li>orginizer: <span id="event-card-orginizer">' + eventData["orginizer"] + '</span></li>' +
        '  <li>location: <span id="event-card-location">' + eventData["location"] + '</span></li>' +
        '  <li>year: <span id="event-card-year">' + eventData["year"] + '</span></li>' +
        '  <li>month: <span id="event-card-month">' + eventData["month"] + + '</span></li>' +
        '  <li>day: <span id="event-card-day">' + eventData["day"] + '</span></li>' +
        '  <li>descreption: <span id="event-card-descreption">' + eventData["descreption"] + '</span></li>' +
        '</ul>';
    fillClassrooms([eventData["location"]]);
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