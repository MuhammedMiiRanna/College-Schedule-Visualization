import json
# Teachers Data Extraction


def session_info(day, session, section, module):
    return {
        'day': day,
        'session_num': 'N-' + str(hours[session]),
        'session': session,
        'section': section,
        'module': module
    }


def add_session(is_class, grp=None):
    if is_class:
        # means cour
        teachers[session['cours']['prof']] = teachers.get(
            session['cours']['prof'], {})
        teachers[session['cours']['prof']
                 ][day] = teachers[session['cours']['prof']].get(day, {})
        teachers[session['cours']['prof']][day][session_index] = teachers[session['cours']
                                                                          ['prof']][day].get(session_index, {})
        teachers[session['cours']['prof']][day][session_index] = session_info(
            day, session['cours']['Time'], data_file_name, session['cours']['Subject'])
        return
    teachers[session['groups'][grp]['prof']] = teachers.get(
        session['groups'][grp]['prof'], {})
    teachers[session['groups'][grp]['prof']
             ][day] = teachers[session['groups'][grp]['prof']].get(day, {})
    teachers[session['groups'][grp]['prof']][day][session_index] = teachers[session['groups']
                                                                            [grp]['prof']][day].get(session_index, {})
    teachers[session['groups'][grp]['prof']][day][session_index] = session_info(
        day, session['groups'][grp]['Time'], data_file_name + " " + grp, session['groups'][grp]['Subject'])


global hours
global teachers


data_files = ['data M1',
              'data M2']

days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
hours = {
    '08:00 - 09:30': 0,
    '09:40 - 11:10': 1,
    '11:20 - 12:50': 2,
    '13:00 - 14:30': 3,
    '14:40 - 16:10': 4,
    '14:40 - 16:10': 5,
    '16:20 - 17:50': 6
}

teachers = {}

for data_file_name in data_files:
    with open("data/"+data_file_name+".json", "r", encoding="UTF-8") as file:
        data = file.readlines()
        # loads and get only "days" data
        data = json.loads("".join(data))['days']

    for day, sessions in data.items():
        for session_index, session in enumerate(sessions):
            if len(session['cours']):  # case if it's normal session
                add_session(True)
            elif len(session['groups']):  # case if it's TD/TP session
                for grp in session['groups']:
                    add_session(False, grp)
            else:  # case of empty session(pass)
                pass

    with open("data/teachersData.json", "w", encoding="UTF-8") as teachers_file:
        teachers_file.writelines(json.dumps(
            teachers, indent=4, ensure_ascii=False))

print('>> Done!!')
