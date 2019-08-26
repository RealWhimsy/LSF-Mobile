var timetableMaster = {"items": []};


function addLectureToTimetable(name, day, startTime, endTime, location) {
    day = convertDay(day);
    timetableMaster.items.push({
        "name": name,
        "image": null,
        "day": day,
        "start_time": startTime,
        "end_time": endTime,
        "color": "4",
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
        if (timetableMaster.items[i].name === content.id) {
            timetableMaster.items.splice(i, 1);
            onTimetableChanged();
        }
    }
}

function changeEntryColor(entry, colorId) {
    var currentColorId;
    for (var i in timetableMaster.items) {
        if (timetableMaster.items[i].name === entry.id) {
            currentColorId = timetableMaster.items[i].color;
            timetableMaster.items[i].color = colorId;
            onTimetableChanged();
        }
    }
    var header = document.getElementsByClassName("popup-header");
    header[0].classList.remove("color-" + currentColorId);
    header[0].classList.add("color-" + colorId);
}

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
// Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.timetable-popup-button')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}