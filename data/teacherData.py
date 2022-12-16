import json


def session_info(day, session, section, module):
    return {
        'day': day,
        'session_num': 'N-' + str(hours[session]),
        'session': session,
        'section': section,
        'module': module
    }

def 

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
        data = json.loads("".join(data))['days'] # loads and get only "days" data

    for day, sessions in data.items():
        for session_index, session in enumerate(sessions):
            if len(session['cours']):  # case if it's normal session
                # teachers[session['cours']][day][hours[session['cours']["Time"]]] = session['cours']["Time"]
                teachers[session['cours']['prof']] = teachers.get(session['cours']['prof'], {})
                teachers[session['cours']['prof']][day] = teachers[session['cours']['prof']].get(day, {})
                teachers[session['cours']['prof']][day][session_index] = teachers[session['cours']['prof']][day].get(session_index, {})
                teachers[session['cours']['prof']][day][session_index] = session_info(day, session['cours']['Time'], data_file_name, session['cours']['Subject'], hours)

                pass
            elif len(session['groups']):
                # # case if it's TD/TP session
                for grp in session['groups']:
                #     teachers.get(grp['prof'], {day: {}}).get(
                #         grp['Time'], {hours[grp['Time']]: grp['Time']})

                #     # hours[session_index] <==> grp['Time']
                pass
            else:  # case of empty session
                pass

    with open("data/teachersData.json", "w", encoding="UTF-8") as teachers_file:
        teachers_file.writelines(json.dumps(
            teachers, indent=4, ensure_ascii=False))
print('>> Done!!')
