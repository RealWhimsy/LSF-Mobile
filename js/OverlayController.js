
function showTimetable() {
    document.getElementById("timetableOverlay").style.display = "block";
}

function hideTimetable() {
    if(!document.getElementsByClassName('tiva-timetable')[0].contains(event.target)){
        document.getElementById("timetableOverlay").style.display = "none";
    }
}

function showSearchResults() {
    document.getElementById("searchResultOverlay").style.display = "block";
}

function hideSearchResults() {
    if(!document.getElementById('searchResultOverlayContainer').contains(event.target)){
        var searchResultOverlay = document.getElementById('searchResultOverlay');
        searchResultOverlay.parentNode.removeChild(searchResultOverlay);
    }
}

function hideSearchResultsButton() {
    var searchResultOverlay = document.getElementById('searchResultOverlay');
    searchResultOverlay.parentNode.removeChild(searchResultOverlay);
}

function hideOverlay(overlay) {
    if(!document.getElementById('lectureOverlay').contains(event.target) || event.target === hideLectureDetailButton) {
        domParent.removeChild(overlay);
    }
}

function toggleMainView(button) {
    // If the already selected button is clicked again, the function should not toggle anything ==> return
    if(button.classList.contains('selected')){
        return;
    }
    var courseButton = document.getElementById('courseButton');
    var timetableButton = document.getElementById('timetableButton');

    var courseList = document.getElementById('accordion-list');
    var timetable = document.getElementById('timetable-1');

    if(courseButton.classList.contains('selected')) {
        courseButton.classList.remove('selected');
        timetableButton.classList.add('selected');

        courseList.style.display = 'none';
        timetable.style.display = 'block';
    } else {
        courseButton.classList.add('selected');
        timetableButton.classList.remove('selected');

        courseList.style.display = 'block';
        timetable.style.display = 'none';
    }
}