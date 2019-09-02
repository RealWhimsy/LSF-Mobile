
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

function hideSearchOverlay() {
    var overlay = document.getElementById('search-overlay');
    if (!document.getElementsByClassName('search-dropdown-content')[0].contains(event.target) && !document.getElementById('search-dropdown').contains(event.target)) {
        overlay.style.display = "none";
    }
}

function showSearchOverlay() {
   var searchOverlay = document.getElementById("search-overlay");
   if(searchOverlay.style.display === "block") {
       hideSearchOverlay();
   } else {
       searchOverlay.style.display = "block";
       console.log(searchOverlay);
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