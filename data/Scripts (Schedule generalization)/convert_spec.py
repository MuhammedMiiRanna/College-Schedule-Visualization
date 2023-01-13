import json

"""_summary_
    This script will take an object that contains the name of the 
    available specialties, and their schedule source file.
    Then it converts it into one object.
"""

# source = "data\schedulesFileNames.json"
# destination = "data\schedulesFile.json"

with open(source, "r") as src:
    schedules_obj = json.load(src)
    
for key, value in schedules_obj.items():
    with open(value[1:], "r") as src:
        schedules_obj[key] = json.load(src)
        
with open(destination, "w") as des:
    json.dump(schedules_obj, des, indent=2)
print(">> Done!!")


# days_tradict = {
#     "Sam": "Saturday",
#     "Dim": "Sunday",
#     "Lun": "Monday",
#     "Mar": "Tuesday",
#     "Mer": "Wednesday",
#     "Jeu": "Thursday",
#     "Saturday": "Saturday",
#     "Sunday": "Sunday",
#     "Monday": "Monday",
#     "Tuesday": "Tuesday",
#     "Wednesday": "Wednesday",
#     "Thursday": "Thursday"
# }