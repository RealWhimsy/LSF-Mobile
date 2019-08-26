var timetableMaster = {"items" : []};


function addLectureToTimetable(name, day, startTime, endTime, location) {
    day = convertDay(day);
    timetableMaster.items.push({
        "name": name,
        "image" : null,
        "day" : day,
        "start_time" : startTime,
        "end_time" : endTime,
        "color" : "4",
        "description": "Location: " + location
    });
    onTimetableChanged();
}

function convertDay(day) {
    switch (day) {
        case "Mo":
            return "monday";
        case "Di":
            return "tuesday";
        case "Mi":
            return "wednesday";
        case "Do":
            return "thursday";
        case "Fr":
            return "friday";
        case "Sa":
            return "saturday";
        case "So":
            return "sunday";
        default:
            return "monday";
    }
}

function deleteEntry(content) {
    for (var i in timetableMaster.items) {
        if (timetableMaster.items[i].name === content.id){
            timetableMaster.items.splice(i, 1);
            onTimetableChanged();
        }
    }
}
