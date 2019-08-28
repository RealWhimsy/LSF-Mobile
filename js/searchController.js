var searchButton, dropdownButton;
var nameInput, moduleInput, startTimeInput, endTimeInput;
var courseName, module, startTime, endTime;
var foundLectures = [];
var overlay;
var overlayContainer;

initDropdownButton();
initSearchButton();
initInputs();

// TODO make time input only accept inputs of the current format ("HH:MM") or convert mistyped inputs to proper format
// TODO make other types of search available (eg. COUNT instead of AND)
// TODO make list scrollable


function initDropdownButton() {
    dropdownButton = document.getElementById('searchCoursesButton');
    dropdownButton.onclick = function () {
        toggleSearchBar();
    }
}

function initInputs() {
    nameInput = document.getElementById("nameInput");
    moduleInput = document.getElementById("moduleInput");
    startTimeInput = document.getElementById("startTimeInput");
    endTimeInput = document.getElementById("endTimeInput");
}

function initSearchButton() {
    searchButton = document.getElementById('searchButton');
    searchButton.onclick = function () {
        readInputValues()
    };
}

function toggleSearchBar() {
    document.getElementById("search-dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', function () {
    if (!document.getElementsByClassName('dropbtn')[0].contains(event.target) && !document.getElementById('search-dropdown').contains(event.target)) {
        var dropdowns = document.getElementsByClassName("search-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});


function readInputValues() {
    courseName = nameInput.value.toLowerCase().trim();
    module = moduleInput.value;
    startTime = startTimeInput.value;
    endTime = endTimeInput.value;

    searchForResults();
}


function searchForResults() {
    foundLectures = [];
    searchByName();
    searchByStartTime();
    searchByEndTime();
    mergeSearches();
    showResults();
    console.log(foundLectures);
}

function showResults() {
    createOverlay();
    createBackButton();
    createEntries();
    showSearchResults();
}

function createBackButton() {
    var backButton = document.createElement('button');
    backButton.innerHTML = "Hide Search Results";
    backButton.onclick = function () {hideSearchResultsButton()};
    backButton.classList.add('timetable-button');
    overlayContainer.appendChild(backButton);
}

function createEntries() {
    for (var i in foundLectures) {
        var lecUl = document.createElement('ul');
        addStylesToElement(lecUl, SEARCH_RESULT_UL);

        var lecLi = document.createElement('li');
        addStylesToElement(lecLi, LECTURE_LAYER_LI_CLASS_LIST);

        var lecA = document.createElement('a');
        addStylesToElement(lecA, LECTURE_LAYER_A_CLASS_LIST);
        lecA.setAttribute("href", "#0");

        var lecSpan = document.createElement('span');
        lecSpan.innerHTML = foundLectures[i].LECTURE_NAME_KEY;
        lecSpan.onclick = function() { showSearchDetails(i) };

        lecUl.appendChild(lecLi);
        lecLi.appendChild(lecA);
        lecA.appendChild(lecSpan);

        overlayContainer.appendChild(lecUl);
    }
}

function showSearchDetails(index) {
    console.log("procced");
    searchDetailOverlay = document.createElement('div');
    searchDetailOverlay.classList.add('lecture-overlay');
    var currentLectureDetails = foundLectures[index];

    createLectureDetailElements();
    fillLectureDetailElements(currentLectureDetails);
    appendChildrenToOverlay(searchDetailOverlay);

    searchDetailOverlay.onclick = function(){hideOverlay(searchDetailOverlay)};
    domParent.appendChild(searchDetailOverlay);
}

function createOverlay() {
    overlay = document.createElement('div');
    overlay.setAttribute('id', 'searchResultOverlay');
    overlay.classList.add('overlay');
    overlay.onclick = function(){hideSearchResults()};
    document.getElementById("body").appendChild(overlay);

    overlayContainer = document.createElement('div');
    overlayContainer.setAttribute('id','searchResultOverlayContainer');
    overlay.appendChild(overlayContainer);
}

function mergeSearches() {
    var searchParams = getSearchParams();
    for (var i in searchParams) {
        deleteNonMatchingLectures(i, searchParams);
    }
}

function deleteNonMatchingLectures(index, params) {
    if (params[0] === true) {
        if (params[index]) {
            for (var i in foundLectures) {
                if (foundLectures[i].LECTURE_NAME_KEY !== undefined) {
                    if (!foundLectures[i].LECTURE_NAME_KEY.toLowerCase().trim().includes(courseName)) {
                        console.log("deleted name");
                        foundLectures.splice(i, 1);
                    }
                }
            }
        }
    }


    if (params[2] === true) {
        if (params[index]) {
            for (var j in foundLectures) {
                if (foundLectures[j].LECTURE_START_TIME_KEY !== undefined) {
                    if (!foundLectures[j].LECTURE_START_TIME_KEY === startTime) {
                        foundLectures.splice(j, 1);
                    }
                }
            }
        }
    }

    if (params[3] === true) {
        if (params[index]) {
            for (var k in foundLectures) {
                if (foundLectures[k].LECTURE_END_TIME_KEY !== undefined) {
                    if (!foundLectures[k].LECTURE_END_TIME_KEY === endTime) {
                        foundLectures.splice(k, 1);
                    }
                }
            }
        }

    }
}

function getSearchParams() {
    var params = [];
    if (courseName != null && courseName !== "") {
        params.push(true);
    } else {
        params.push(false);
    }

    if (module != null && module !== "") {
        params.push(true);
    } else {
        params.push(false);
    }

    if (startTime != null && startTime !== "") {
        params.push(true);
    } else {
        params.push(false);
    }

    if (endTime != null && endTime !== "") {
        params.push(true);
    } else {
        params.push(false);
    }

    return params;
}

function searchByEndTime() {
    for (var i in lectureList) {
        var currentLecture = lectureList[i];
        if (endTime != null && endTime !== "") {
            if (currentLecture.LECTURE_END_TIME_KEY === endTime) {
                foundLectures.push(currentLecture);
            }
        }
    }
}

function searchByStartTime() {
    for (var i in lectureList) {
        var currentLecture = lectureList[i];
        if (startTime != null && startTime !== "") {
            if (currentLecture.LECTURE_START_TIME_KEY === startTime) {
                foundLectures.push(currentLecture);
            }
        }
    }
}

function searchByName() {
    for (var i in lectureList) {
        var currentLecture = lectureList[i];
        if (courseName != null && courseName !== "") {
            if (currentLecture.LECTURE_NAME_KEY != undefined) {
                if (currentLecture.LECTURE_NAME_KEY.toLowerCase().trim().includes(courseName)) {
                    foundLectures.push(currentLecture);
                }
            }
        }

    }
}