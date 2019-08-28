var currentFaculty, currentModule, currentLesserModule;
var accordionList = document.getElementById('accordion-list');
var domParent = document.getElementById("body");

var lectureDetailOverlay, lectureDetailList, lectureDay, lectureStartTime, lectureEndTime, lectureLocation, lectureName,
    addToTimetableButton;

var detailName, detailStartTime, detailEndTime, detailLocation, detailDay;

var currentID = 0;

var facultyList = [""];
var moduleList = [""];
var lesserModuleList = [""];

var facAlreadyExisting = false;
var modAlreadyExisting = false;
var lesAlreadyExisting = false;


// function checkForDuplicateEntries(faculty, currentModule, lesserModule) {
//     console.log(facultyList);
//     for (var i in facultyList) {
//         if (facultyList[i] === faculty) {
//             facAlreadyExisting = true;
//         }
//     }
//     if (!facAlreadyExisting) {
//         facultyList.push(faculty);
//         createFacultyEntry(faculty);
//     } else {
//         facAlreadyExisting = false;
//     }
//
//     for (var j in moduleList) {
//         if (moduleList[j] === currentModule) {
//             modAlreadyExisting = true;
//         }
//         if(!modAlreadyExisting) {
//             moduleList.push(currentModule);
//             createModuleEntry(faculty, currentModule);
//         } else {
//             modAlreadyExisting = false;
//         }
//     }
//
//     for (var k in lesserModuleList) {
//         if (lesserModuleList[k] === lesserModule) {
//             lesAlreadyExisting = true;
//         }
//     }
//     if (!lesAlreadyExisting) {
//         lesserModuleList.push(lesserModule);
//         createLesserModuleEntry(faculty, currentModule, lesserModule);
//     } else {
//         lesAlreadyExisting = false;
//     }
//
// }


function createAccordionEntry(faculty, currentModule, lesserModule, lectureName) {
    createFacultyEntry(faculty);
    createModuleEntry(faculty, currentModule);
    createLesserModuleEntry(faculty, currentModule, lesserModule);
    createLectureEntry(faculty, currentModule, lesserModule, lectureName);
}

function getLectureId(faculty, currentModule, lesserModule, lectureName) {
    var path = faculty + ";" + currentModule + ";" + lesserModule;
    for (var i = 0; i < courses.length; i++) {
        if(courses[i].LECTURE_PATH === path && courses[i].LECTURE_NAME_KEY === lectureName) {
            return courses[i].LECTURE_ID_KEY;
        }
    }
    return -1;
}

function createLectureEntry(faculty, currentModule, lesserModule, lectureName) {
    var lecUl = document.createElement('ul');
    addStylesToElement(lecUl, LECTURE_LAYER_UL_CLASS_LIST);

    var lecLi = document.createElement('li');
    addStylesToElement(lecLi, LECTURE_LAYER_LI_CLASS_LIST);
    lecLi.setAttribute('id', faculty + currentModule + lesserModule + lectureName);

    var lecA = document.createElement('a');
    addStylesToElement(lecA, LECTURE_LAYER_A_CLASS_LIST);
    lecA.setAttribute("href", "#0");

    var lecSpan = document.createElement('span');
    lecSpan.innerHTML = lectureName;

    lecUl.appendChild(lecLi);
    lecLi.appendChild(lecA);
    lecA.appendChild(lecSpan);
    var lectureId = getLectureId(faculty, currentModule, lesserModule, lectureName);
    lecSpan.onclick = function () {
        showLectureDetails(lectureId)
    };
    currentLesserModule = document.getElementById(faculty + currentModule + lesserModule);
    currentLesserModule.appendChild(lecUl);
}


function createFacultyEntry(faculty) {
    for (var i = 0; i < facultyList.length; i++) {
        if(facultyList[i] === faculty) {
            facAlreadyExisting = true;
        }
    }

    if (facAlreadyExisting === false) {
        var facLi = document.createElement('li');
        addStylesToElement(facLi, FACULTY_LAYER_LI_CLASS_LIST);
        facLi.setAttribute('id', faculty);

        var facInput = document.createElement('input');
        addStylesToElement(facInput, FACULTY_LAYER_INPUT_CLASS_LIST);
        setInputAttributes(facInput);

        var facLabel = document.createElement('label');
        addStylesToElement(facLabel, FACULTY_LAYER_LABEL_CLASS_LIST);
        setLabelAttributes(facLabel);

        var facSpan = document.createElement('span');
        facSpan.innerHTML = faculty;

        facLi.appendChild(facInput);
        facLi.appendChild(facLabel);
        facLabel.appendChild(facSpan);

        accordionList.appendChild(facLi);

        facultyList.push(faculty);
    }
    facAlreadyExisting = false;
}

function createModuleEntry(faculty, currentModule) {
    var modulePath = "" + faculty + currentModule;
    for (var i = 0; i < moduleList.length; i++) {
        if(moduleList[i] === modulePath) {
            modAlreadyExisting = true;
        }
    }

    if(modAlreadyExisting === false && currentModule !== null) {
        var modUl = document.createElement('ul');
        addStylesToElement(modUl, MODULE_LAYER_UL_CLASS_LIST);


        var modLi = document.createElement('li');
        addStylesToElement(modLi, MODULE_LAYER_LI_CLASS_LIST);
        modLi.setAttribute('id', faculty + currentModule);

        var modInput = document.createElement('input');
        addStylesToElement(modInput, MODULE_LAYER_INPUT_CLASS_LIST);
        setInputAttributes(modInput);

        var modLabel = document.createElement('label');
        addStylesToElement(modLabel, MODULE_LAYER_LABEL_CLASS_LIST);
        setLabelAttributes(modLabel);

        var modSpan = document.createElement('span');
        modSpan.innerHTML = currentModule;

        modUl.appendChild(modLi);
        modLi.appendChild(modInput);
        modLi.appendChild(modLabel);
        modLabel.appendChild(modSpan);

        currentFaculty = document.getElementById(faculty);
        currentFaculty.appendChild(modUl);
        moduleList.push(modulePath);
    }
   modAlreadyExisting = false;
}

function createLesserModuleEntry(faculty, currentModule, lesserModule) {
    var lesserModulePath = "" + faculty + currentModule + lesserModule;
    for (var i = 0; i < lesserModuleList.length; i++) {
        if(lesserModuleList[i] === lesserModulePath) {
            lesAlreadyExisting = true;
        }
    }

    if(lesAlreadyExisting === false && lesserModule !== null) {
        var lesUl = document.createElement('ul');
        addStylesToElement(lesUl, LESSER_LAYER_UL_CLASS_LIST);


        var lesLi = document.createElement('li');
        addStylesToElement(lesLi, LESSER_LAYER_LI_CLASS_LIST);
        lesLi.setAttribute('id', faculty + currentModule + lesserModule);

        var lesInput = document.createElement('input');
        addStylesToElement(lesInput, LESSER_LAYER_INPUT_CLASS_LIST);
        setInputAttributes(lesInput);

        var lesLabel = document.createElement('label')
        addStylesToElement(lesLabel, LESSER_LAYER_LABEL_CLASS_LIST);
        setLabelAttributes(lesLabel);

        var lesSpan = document.createElement('span');
        lesSpan.innerHTML = lesserModule;

        lesUl.appendChild(lesLi);
        lesLi.appendChild(lesInput);
        lesLi.appendChild(lesLabel);
        lesLabel.appendChild(lesSpan);

        currentModule = document.getElementById(faculty + currentModule);
        currentModule.appendChild(lesUl);
        lesserModuleList.push(lesserModulePath);

    }
   lesAlreadyExisting = false;
}

// This function triggers on clicking a lecture-level entry in the accordion
// It creates a new div with overlay-properties and inserts it into the page
// The Overlay-div contains several <p> elements which are filled with details (time, location) etc. of the clicked lecture
function showLectureDetails(lectureId) {
    console.log(lectureId);
    lectureDetailOverlay = document.createElement("div");
    lectureDetailOverlay.classList.add("lecture-overlay");
    var currentLectureDetails = courses[lectureId];

    createLectureDetailElements();
    fillLectureDetailElements(currentLectureDetails);
    appendChildrenToOverlay(lectureDetailOverlay);

    lectureDetailOverlay.onclick = function () {
        hideOverlay(lectureDetailOverlay)
    };
    domParent.appendChild(lectureDetailOverlay);
}

function hideOverlay(overlay) {
    domParent.removeChild(overlay);
}

function appendChildrenToOverlay(overlay) {
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("overlay-container");
    initAddToTimetableButton();

    containerDiv.appendChild(lectureName);
    containerDiv.appendChild(lectureDay);
    containerDiv.appendChild(lectureStartTime);
    containerDiv.appendChild(lectureEndTime);
    containerDiv.appendChild(lectureLocation);
    containerDiv.appendChild(addToTimetableButton);

    overlay.appendChild(containerDiv);
}

function initAddToTimetableButton() {
    addToTimetableButton = document.createElement('button');
    addToTimetableButton.onclick = function () {
        addLectureToTimetable(detailName, detailDay, detailStartTime, detailEndTime, detailLocation)
    };
    addToTimetableButton.classList.add("timetable-button");
    addToTimetableButton.style.border = "1px solid black";
    addToTimetableButton.innerHTML = "Add to timetable";
}

// Fills the <p> elements within the overlay-div with the text that should be displayed
function fillLectureDetailElements(details) {
    fillDetailVariables(details);
    lectureName.innerHTML = "Lecture: " + details.LECTURE_NAME_KEY;
    lectureStartTime.innerHTML = "Start Time: " + details.LECTURE_START_TIME_KEY;
    lectureEndTime.innerHTML = "End Time: " + details.LECTURE_END_TIME_KEY;
    lectureLocation.innerHTML = "Location: " + details.LECTURE_LOCATION_KEY;
    lectureDay.innerHTML = "Weekday: " + details.LECTURE_DAY_KEY;
}

// Assigns values to detail-variables to make thema accessible from everywhere
function fillDetailVariables(details) {
    detailDay = details.LECTURE_DAY_KEY;
    detailName = details.LECTURE_NAME_KEY;
    detailStartTime = details.LECTURE_START_TIME_KEY;
    detailEndTime = details.LECTURE_END_TIME_KEY;
    detailLocation = details.LECTURE_LOCATION_KEY;
}

// Creates the elements for the lecture detail overlay-div
function createLectureDetailElements() {
    lectureDetailList = document.createElement("div");
    lectureName = document.createElement("p");
    lectureStartTime = document.createElement("p");
    lectureEndTime = document.createElement("p");
    lectureLocation = document.createElement("p");
    lectureDay = document.createElement("p");
}

// Helper method to quickly add an array of Strings to the class list of an element
function addStylesToElement(element, styles) {
    for (var i in styles) {
        element.classList.add(styles[i]);
    }
}

function setInputAttributes(input) {
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", currentID);
}

function setLabelAttributes(label) {
    label.setAttribute("for", currentID);
    currentID++;
}

