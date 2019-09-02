var currentFaculty, currentModule, currentLesserModule;
var accordionList = document.getElementById('accordion-list');
var domParent = document.getElementById("body");

var lectureDetailOverlay, lectureDetailList;
var lectureDayPArray = [];
var lectureStartTimePArray = [];
var lectureEndTimePArray = [];
var lectureLocationPArray = [];
var lectureNamePArray = [];
var lectureButtonArray = [];
var addToTimetableButton, hideLectureDetailButton;

var currentID = 0;

var facultyList = [""];
var moduleList = [""];
var lesserModuleList = [""];

var facAlreadyExisting = false;
var modAlreadyExisting = false;
var lesAlreadyExisting = false;

var containerDiv;


function createAccordionEntry(faculty, currentModule, lesserModule, lectureName) {
    createFacultyEntry(faculty);
    createModuleEntry(faculty, currentModule);
    createLesserModuleEntry(faculty, currentModule, lesserModule);
    createLectureEntry(faculty, currentModule, lesserModule, lectureName);
}

function getLectureId(faculty, currentModule, lesserModule, lectureName) {
    var path = faculty + ";" + currentModule + ";" + lesserModule;
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].LECTURE_PATH === path && courses[i].LECTURE_NAME_KEY === lectureName) {
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

    var lecIcon = document.createElement('i');
    addStylesToElement(lecIcon, LECTURE_ICON_CLASS_LIST);
    lecA.appendChild(lecIcon);

    var lecSpan = document.createElement('span');
    lecSpan.innerHTML = lectureName;
    lecSpan.classList.add('lecture');



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
        if (facultyList[i] === faculty) {
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
        if (moduleList[i] === modulePath) {
            modAlreadyExisting = true;
        }
    }

    if (modAlreadyExisting === false && currentModule !== null) {
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
        if (lesserModuleList[i] === lesserModulePath) {
            lesAlreadyExisting = true;
        }
    }

    if (lesAlreadyExisting === false && lesserModule !== null) {
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

function setupHideButton() {
    hideLectureDetailButton = document.createElement('button');
    hideLectureDetailButton.classList.add('timetable-button');
    hideLectureDetailButton.classList.add('detail-hide-button');
    hideLectureDetailButton.onclick = function () {
        hideOverlay(lectureDetailOverlay);
    };
    hideLectureDetailButton.innerText = "Hide Details";
}


function resetPArrays() {
    lectureDayPArray = [];
    lectureNamePArray = [];
    lectureStartTimePArray = [];
    lectureEndTimePArray = [];
    lectureLocationPArray = [];
    lectureButtonArray = [];
}
// This function triggers on clicking a lecture-level entry in the accordion
// It creates a new div with overlay-properties and inserts it into the page
// The Overlay-div contains several <p> elements which are filled with details (time, location) etc. of the clicked lecture
function showLectureDetails(lectureId) {
    lectureDetailOverlay = document.createElement("div");
    lectureDetailOverlay.classList.add("lecture-overlay");
    setupHideButton();

    var currentLectureDetails = courses[lectureId];

    createLectureDetailElements(currentLectureDetails);
    fillLectureDetailElements(currentLectureDetails);
    appendChildrenToOverlay(lectureDetailOverlay);
    containerDiv.appendChild(hideLectureDetailButton);

    lectureDetailOverlay.onclick = function () {
        hideOverlay(lectureDetailOverlay)
    };
    domParent.appendChild(lectureDetailOverlay);
    resetPArrays();
}

function hideOverlay(overlay) {
    domParent.removeChild(overlay);
}

function appendChildrenToOverlay(overlay) {
    containerDiv = document.createElement("div");
    containerDiv.classList.add("overlay-container");
    containerDiv.setAttribute('id', "lectureOverlay");


    for (var i = 0; i < lectureStartTimePArray.length; i++) {
        containerDiv.appendChild(lectureNamePArray[i]);
        containerDiv.appendChild(lectureDayPArray[i]);
        containerDiv.appendChild(lectureStartTimePArray[i]);
        containerDiv.appendChild(lectureEndTimePArray[i]);
        containerDiv.appendChild(lectureLocationPArray[i]);
        containerDiv.appendChild(lectureButtonArray[i]);
    }


    overlay.appendChild(containerDiv);
}


// Fills the <p> elements within the overlay-div with the text that should be displayed
function fillLectureDetailElements(details) {
    for (var i = 0; i < lectureStartTimePArray.length; i++) {
        lectureNamePArray[i].innerHTML = "Kursname: " + details.LECTURE_NAME_KEY;
        lectureStartTimePArray[i].innerHTML = "Beginn: " + details.LECTURE_START_TIME_KEY[i];
        lectureEndTimePArray[i].innerHTML = "Ende: " + details.LECTURE_END_TIME_KEY[i];
        lectureLocationPArray[i].innerHTML = "Ort: " + details.LECTURE_LOCATION_KEY[i];
        lectureDayPArray[i].innerHTML = "Tag: " + details.LECTURE_DAY_KEY[i];
        setupButton(i, details.LECTURE_NAME_KEY, details.LECTURE_DAY_KEY[i], details.LECTURE_START_TIME_KEY[i], details.LECTURE_END_TIME_KEY[i], details.LECTURE_LOCATION_KEY[i], details.LECTURE_FACULTY_KEY);
    }

}

function setupButton(index, name, day, startTime, endTime, location, faculty) {
    var currentButton = lectureButtonArray[index];
    currentButton.onclick = function () {
        addLectureToTimetable(name, day, startTime, endTime, location, currentButton, faculty);
    };
    currentButton.classList.add("timetable-button");
    currentButton.style.border = "1px solid black";
    currentButton.innerHTML = "Add to timetable";
}


// Creates the elements for the lecture detail overlay-div
function createLectureDetailElements(details) {
    lectureDetailList = document.createElement("div");
    for (var i = 0; i < details.LECTURE_DAY_KEY.length; i++) {
        lectureNamePArray.push(document.createElement("p"));
        lectureStartTimePArray.push(document.createElement("p"));
        lectureEndTimePArray.push(document.createElement("p"));
        lectureLocationPArray.push(document.createElement("p"));
        lectureDayPArray.push(document.createElement("p"));
        lectureButtonArray.push(addToTimetableButton = document.createElement('button'));
    }
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

