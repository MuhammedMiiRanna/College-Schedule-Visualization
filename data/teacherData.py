import json

# Teachers Data Extraction


def session_info(day, session, section, module):
    return {
        "day": day,
        "session_num": "N-" + str(hours[session]),
        "session": session,
        "section": section,
        "module": module,
    }


def add_session(is_class, session_index, grp=None):
    if is_class:
        # means cour
        teachers[session["cours"]["prof"]] = teachers.get(session["cours"]["prof"], {})
        teachers[session["cours"]["prof"]][day] = teachers[session["cours"]["prof"]].get(day, {})
        teachers[session["cours"]["prof"]][day][session_index] = \
            teachers[session["cours"]["prof"]][day].get(session_index, {})
        teachers[session["cours"]["prof"]][day][session_index] = \
            session_info(day, session["cours"]["Time"], data_file_name, session["cours"]["Subject"]
        )
        return
    teachers[session["groups"][grp]["prof"]] = teachers.get(
        session["groups"][grp]["prof"], {}
    )
    teachers[session["groups"][grp]["prof"]][day] = teachers[
        session["groups"][grp]["prof"]
    ].get(day, {})
    teachers[session["groups"][grp]["prof"]][day][session_index] = teachers[
        session["groups"][grp]["prof"]
    ][day].get(session_index, {})
    teachers[session["groups"][grp]["prof"]][day][session_index] = session_info(
        day,
        session["groups"][grp]["Time"],
        data_file_name + " " + grp,
        session["groups"][grp]["Subject"],
    )


global hours
global teachers

data_Direc = "data/"
data_files = ["data M1", "data M2"]

# data_Direc = "data/Schedules/"
# data_files = ['M1_MIV',
#               'M1_RSD',
#               'M1_SII',
#               'M2_MIV',
#               'M2_RSD',
#               'M2_SII']


days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
hours = {
    "08:00 - 09:30": 1,
    "09:40 - 11:10": 2,
    "11:20 - 12:50": 3,
    "13:00 - 14:30": 4,
    "14:40 - 16:10": 5,
    "14:40 - 16:10": 6,
    "16:20 - 17:50": 7,
}

teachers = {}

for data_file_name in data_files:
    with open(data_Direc + data_file_name + ".json", "r", encoding="UTF-8") as file:
        data = file.readlines()
        # loads and get only "days" data
        data = json.loads("".join(data))["days"]

    for day, sessions in data.items():
        for session_index, session in enumerate(sessions):
            if len(session["cours"]):  # case if it's normal session
                add_session(True, session_index+1)
            elif len(session["groups"]):  # case if it's TD/TP session
                for grp in session["groups"]:
                    add_session(False, session_index+1, grp)
            else:  # case of empty session(pass)
                pass

    with open(data_Direc + "teachersData.json", "w", encoding="UTF-8") as teachers_file:
        teachers_file.writelines(json.dumps(
            teachers, indent=4, ensure_ascii=False))

print(">> Done!!")
