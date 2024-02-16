# College-Schedule-Visualization-

Data visualization project where you can see the reserved classrooms in which the students are using for their classes using the D3.js library.

- How to use it?
- Screenshots
- USAGE
- Mentions
- Todo/to-add
- issues to fix for the next version

# How to use it?

For now, you can visualize the schedule of The Computer Science faculty in The University of Science and Technology Houari Boumediene, Algeria.

First, open the project with vs Code then open the mapVisualization.html file with the live server extension, you can use any alternative you like.

- Memmory Usage: 50Mb ~ 180Mb

# Screenshots

## USTHB Map

![USTHB Map](screenshots/Schedule%20visualization%20app.png)

## Students info

![USTHB Map](screenshots/Students%20info.png)

## Teachers info

![USTHB Map](screenshots/teachers%20info.png)

# USAGE

- `mapVisualization.html` The main page.
- `styles.css` was used for the visual design and layout of the project.

- `scripts` this folder contain every js script of this project.

  - `map.js` responsible for drawing the map.
  - `addDynamicData.js` responsible for adding dynamic data(teachers names + sections)
  - `formEvents.js` holds all the logic of the EventListeners.
  - `formsLib.js` holds most logic of the project, from getting the data till zooming into the classroom.
  - `EventListener.js` holds most logic of the project, from getting the data till zooming into the classroom.
  - `events.js` shows location of the events (For the next version)

- `files`

  - `dataStructureInfo.txt` some info about the used data structure since it was too complex to handle in mind.
  - `MIV.pdf` Master 2 computer vision section schedule.
  - `Projet_DV.pdf` project instructions(in French).

- `data` json files that contains both students and teacher Schedules.

  - `eventsData` the data of any possible event.
  - `general_schedules` Contains every schedule we could get.
  - `Schedules` Some master students schedules.
  - `Scripts (Schedule generalization)`

    - `classroomsChekcer.py` script that check the classrooms that we need
    - `convert_spec.py` take every schedule source file Then it converts it into one josn object.
    - `generalizer.py` -

  - `teachersSchedule` teachers Schedule.

    - `teacherData.py` extract Teacher's Data from Json Schedule files and return a json file that contains only the teacher's data (sessions of the week).
    - `FacTeachersData.json` teachers Schedule.

  - `schedulesFile.josn` data of all Schedules.
  - `schedulesFileNames.josn` teachers Schedule.

  - ``

- `d3` d3.js library.
- `Others` unrelated files.

# Mentions

Special thnks for **Dekali Mounir** for helping me with the Zoom features, **Ahmane Amine** for providing Data Scraper from A PDF, this one saved much time for us.

# Todo/to-add:

- Make it with React 18 (thinking about this for the next version)

- Floors with numbers.

- check the available buildings/clubs/locations by name.

- check the availability of a building/club/location by name or the available ones all at once for a given hour.

- facilitie type: studying, food, religion, store....

- Check the location of administration desks and professors office.

- add the occupied classrooms for a selected hour, or maybe add a form to check for occupied classrooms.

- adding a form for the events(event can be a graduation or a conference or else).
- i may wanna check for the classrooms that are not found when the map is loaded first, we can add a tab to check and filter all issues.

# issues to fix for the next version

- when a classroom is not found, we should initialize the zoom or show the nearby of where it should be.

- Try to remove the bg hover effect. "Fixed"

- when there is a session in 2 far classrooms, the zoom will focus in the middle which is an issue, since none of them can be seen, we can fix that by having small windows to show each location.
