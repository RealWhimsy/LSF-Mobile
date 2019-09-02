
checkHelpTextStatus();


function checkHelpTextStatus() {
    if(localStorage.getItem(SHOW_HELP_TEXT) === "false") {
        changeHelpText(false);
    } else {
        changeHelpText(true);
    }

}

function changeHelpText(textIsShown) {
    var helpText = document.getElementById('help-text');
    var helpTextToggle = document.getElementById('hide-help-text');

    if(textIsShown === true) {
        helpText.style.display = "none";
        helpTextToggle.innerHTML = "<i class=\"fas fa-question\"></i> Hilfetext anzeigen";
    } else {
        helpText.style.display = "block";
        helpTextToggle.innerHTML = "<i class=\"fas fa-question\"></i> Hilfetext verstecken";
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
   }
}

function toggleHelpText() {
    var textIsShown = localStorage.getItem(SHOW_HELP_TEXT);
    if(textIsShown === null || textIsShown === "true") {
        localStorage.setItem(SHOW_HELP_TEXT, "false");
        checkHelpTextStatus();
    } else {
        localStorage.setItem(SHOW_HELP_TEXT, "true");
        checkHelpTextStatus();
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