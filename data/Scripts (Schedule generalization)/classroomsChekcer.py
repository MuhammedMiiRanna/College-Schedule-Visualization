from pathlib import Path
import json

"""
    script that check the classrooms that we need
    and the classroom that are ready.
"""
# schedule_files = ["schedulesFile.json",
#   "teachersSchedule/FacTeachersData.json"]
classrooms_set = set()
ready_classrooms_set = set()

#
schedule_files = Path("data/schedulesFile.json")
geojson = Path("MapVisExp/USTHB map/USTHB_V11.geojson")
#
schedule_files = json.load(open(schedule_files, "r", encoding="UTF-8"))
geojson = json.load(open(geojson, "r", encoding="UTF-8"))
#

for spec_key in schedule_files.keys():
    for day_key in schedule_files[spec_key]["days"].keys():
        for session in schedule_files[spec_key]["days"][day_key]:
            if session["cours"]:
                # print(session["cours"]["loc"])
                classrooms_set.add(str(session["cours"]["loc"]))
            elif session["groups"]:
                for grp_session in session["groups"].values():
                    # print(grp_session["loc"])
                    classrooms_set.add(str(grp_session["loc"]))


for feature in geojson["features"]:
    ready_classrooms_set.add(str(feature["properties"]["name"]))
    # ready_classrooms_set.add(str(feature["properties"]["name"]))


needed_classrooms_set = classrooms_set.difference(ready_classrooms_set)
# print(sorted(needed_classrooms_set), end="\n\n\n")
# print(sorted(ready_classrooms_set))
print(needed_classrooms_set)

# with open(Path("data/Scripts (Schedule generalization)/needed_classrooms_set"), "w") as a, open(Path("data/Scripts (Schedule generalization)/ready_classrooms_set"), "w") as b:
#     pass
classrooms_set = sorted(classrooms_set)
ready_classrooms_set = sorted(ready_classrooms_set)

Path("data/Scripts (Schedule generalization)/ready_classrooms_set.json").write_text(
    json.dumps(dict(zip([index for index in range(len(ready_classrooms_set))], ready_classrooms_set))), encoding="UTF-8")
Path("data/Scripts (Schedule generalization)/classrooms_set.json").write_text(
    json.dumps(dict(zip([index for index in range(len(classrooms_set))], classrooms_set))), encoding="UTF-8")
Path("data/Scripts (Schedule generalization)/needed_classrooms_set.json").write_text(
    json.dumps(dict(zip([index for index in range(len(needed_classrooms_set))], needed_classrooms_set)), ), encoding="UTF-8")


print("DoNe!!")
