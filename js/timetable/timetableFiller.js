var timetableMaster = {"items": []};
var addedIcon = setupIcon();



checkForStoredTimetable();
function checkForStoredTimetable() {
    if (localStorage.getItem(TIMETABLE_LOCAL_KEY ) !== null) {
        timetableMaster = JSON.parse(localStorage.getItem(TIMETABLE_LOCAL_KEY));
    }
}


function setupIcon() {
    var addedIcon = document.createElement('i');
    addedIcon.style.paddingLeft = "4px";
    addedIcon.classList.add("far");
    addedIcon.classList.add("fa-check-circle");
    return addedIcon;
}

function addLectureToTimetable(name, day, startTime, endTime, location, button, faculty) {
    day = convertDay(day);
    timetableMaster.items.push({
        "name": name,
        "image": null,
        "day": day,
        "start_time": startTime,
        "end_time": endTime,
        "color": "4",
        "description": "Ort: " + location + "<br>" + "Fakultät: " + faculty
    });
    button.classList.add('timetable-added');
    button.innerText = "Erfolgreich hinzugefügt";
    setupIcon();
    button.appendChild(addedIcon);
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
// Deletes an entry from the timetable after the confirmation message has been answered affirmitavely
// Deletes the object from the timetable array according to ID, then notifies the listener that the timetable as changed
function deleteEntry(content) {
    var confirmation = confirm("Diesen Eintrag wirklich aus dem Stundenplan löschen?");
    if(confirmation) {
        for (var i in timetableMaster.items) {
            if (timetableMaster.items[i].name === content.id) {
                timetableMaster.items.splice(i, 1);
                console.log(content.parentNode.parentNode);
                var popup = document.getElementById(content.parentNode.parentNode.id);
                popup.parentNode.removeChild(popup);
                console.log(popup);
                onTimetableChanged();
            }
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


//Shows/Hides the Dropdown menu for choosing a different color in the lecture detail view.
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
