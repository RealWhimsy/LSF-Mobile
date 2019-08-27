
function showTimetable() {
    document.getElementById("overlay").style.display = "block";
}

function hideTimetable() {
    if(!document.getElementsByClassName('tiva-timetable')[0].contains(event.target)){
        document.getElementById("overlay").style.display = "none";
    }
}
