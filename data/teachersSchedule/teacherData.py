import json
from time import time
from os import listdir

"""_summary_
A Script that extract Teacher's Data from Json Schedule files

Returns:
    Create a json file that contains every teacher's data (sessions of the week)
"""
t1 = time()


def session_info(day, session, loc, section, module):
    return {
        "day": days_tradict[day],
        "session_num": "N-" + str(hours[session]),
        "session": session,
        "classroom": loc,   
        "section": section,
        "module": module,
    }


def add_session(is_class, day, session_index, grp=None):
    if is_class:
        # means cour
        teachers[session["cours"]["prof"]] = \
            teachers.get(session["cours"]["prof"], {})
        teachers[session["cours"]["prof"]][day] = \
            teachers[session["cours"]["prof"]].get(day, {})
        teachers[session["cours"]["prof"]][day][session_index] = \
            teachers[session["cours"]["prof"]][day].get(session_index, {})
        teachers[session["cours"]["prof"]][day][session_index] = \
            session_info(
                day,
                session["cours"]["Time"],
                session["cours"]["loc"],
                data_file_name,
                session["cours"]["Subject"]
        )
        return
    teachers[session["groups"][grp]["prof"]] = \
        teachers.get(session["groups"][grp]["prof"], {})
    teachers[session["groups"][grp]["prof"]][day] = \
        teachers[session["groups"][grp]["prof"]].get(day, {})
    teachers[session["groups"][grp]["prof"]][day][session_index] = \
        teachers[session["groups"][grp]["prof"]][day].get(session_index, {})
    teachers[session["groups"][grp]["prof"]][day][session_index] = \
        session_info(
            day,
            session["groups"][grp]["Time"],
            session["groups"][grp]["loc"],
            data_file_name + " " + grp,
            session["groups"][grp]["Subject"],
    )


global hours
global teachers
global days_tradict

# parameter
indent = 2
encoding = "UTF-8"
extension = ".json"

# data_Direc = "data/"
# data_file = "data/teachersData.json"
# data_files = ["data M1",
#               "data M2"]

# data_Direc = "data/Schedules/"
# data_file = "data/teachersData2.json"
# data_files = ['M1_MIV',
#               'M1_RSD',
#               'M1_SII',
#               'M2_MIV',
#               'M2_RSD',
#               'M2_SII']

data_Direc = "data/general_schedules/"
data_files = map(lambda x: x[:x.index(".json")], listdir(data_Direc))
data_file = "data/teachersSchedule/FacTeachersData.json"

teachers = {}
days_tradict = {
    "Sam": "Saturday",
    "Dim": "Sunday",
    "Lun": "Monday",
    "Mar": "Tuesday",
    "Mer": "Wednesday",
    "Jeu": "Thursday",
    "Saturday": "Saturday",
    "Sunday": "Sunday",
    "Monday": "Monday",
    "Tuesday": "Tuesday",
    "Wednesday": "Wednesday",
    "Thursday": "Thursday"
}
hours = {
    "08:00 - 09:30": 1,
    "09:40 - 11:10": 2,
    "11:20 - 12:50": 3,
    "13:00 - 14:30": 4,
    "14:40 - 16:10": 5,
    "14:40 - 16:10": 6,
    "16:20 - 17:50": 7,
}


for data_file_name in data_files:
    with open(data_Direc + data_file_name + extension, "r", encoding=encoding) as file:
        data = json.loads("".join(file.readlines()))["days"]
        # data = file.readlines()  # loads and get only "days" data
        # data = json.loads("".join(data))["days"]

    for day, sessions in data.items():
        for session_index, session in enumerate(sessions):
            if len(session["cours"]):  # case if it's normal session
                add_session(True, days_tradict[day], session_index+1)
            elif len(session["groups"]):  # case if it's TD/TP session
                [add_session(False, days_tradict[day], session_index+1, grp)
                 for grp in session["groups"]]
            else:
                pass  # case of empty session(pass) pass

    with open(data_file, "w", encoding=encoding) as teachers_file:
        teachers_file.writelines(json.dumps(
            teachers, indent=indent, ensure_ascii=False))

print(">> Done!!")
print("Time: ", time()-t1)
# Time:  0.5915162563323975 Sec
# Time:  0.40331363677978516 Sec (after adding the map and the days dict)
# Time:  0.32178306579589844 Sec (after adding the days dict as an argument)
# Time:  0.2691497802734375 Sec (last try)

# ISSUES ==> G2: "prof": "RAYAN"
# ISSUES ==> G2: "prof": "BACHEN"
# ISSUES ==> G3: "prof": "KOUAR"
# ISSUES ==> G4: "prof": "NIID"
# ISSUES ==> nn: "prof": "ANTRI" (no name)
