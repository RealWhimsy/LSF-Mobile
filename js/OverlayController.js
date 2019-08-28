
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
        searchResultOverlay.style.display = "none";
    }
}

function hideSearchResultsButton() {
    var searchResultOverlay = document.getElementById('searchResultOverlay');
    searchResultOverlay.style.display = "none";
}
