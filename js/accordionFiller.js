
var currentFaculty, currentModule, currentLesserModule;
var accordionList = document.getElementById('accordion-list');
var domParent = document.getElementById("body");

var lectureDetailOverlay, lectureDetailList, lectureDay, lectureStartTime, lectureEndTime, lectureLocation, lectureName, addToTimetableButton;

var detailName, detailStartTime, detailEndTime, detailLocation, detailDay;

var currentID = 0;

// This method creates an entry in the accordion
// The level of the accordion-entry depends on the 'layer' parameter, there is a total of 4 different levels
// Each level requires different elements to be created
// The 'name' parameter is the name of the lecture that is finally displayed in a <span> element in the accordion
// The 'lectureId' parameter is needed to know what exact entry has been clicked, in case the user wants to add the lecture to his timetable
// The 'lectureFound' parameter can be either true or false (default: true). If it is false, the onclick function gets disabled and
// the font gets slightly greyed out to signal that no lectures are available in the chosen folder
function createAccordionEntry(name, layer, lectureId, lectureFound) {
    switch(layer) {
        case FACULTY_LAYER:
            var facLi = document.createElement('li');
            addStylesToElement(facLi, FACULTY_LAYER_LI_CLASS_LIST);

            var facInput = document.createElement('input');
            addStylesToElement(facInput, FACULTY_LAYER_INPUT_CLASS_LIST);
            setInputAttributes(facInput);

            var facLabel = document.createElement('label');
            addStylesToElement(facLabel, FACULTY_LAYER_LABEL_CLASS_LIST);
            setLabelAttributes(facLabel);

            var facSpan = document.createElement('span');
            facSpan.innerHTML = name;

            facLi.appendChild(facInput);
            facLi.appendChild(facLabel);
            facLabel.appendChild(facSpan);

            currentFaculty = facLi;
            accordionList.appendChild(currentFaculty);
            break;

        case MODULE_LAYER:
            var modUl = document.createElement('ul');
            addStylesToElement(modUl, MODULE_LAYER_UL_CLASS_LIST);

            var modLi = document.createElement('li');
            addStylesToElement(modLi, MODULE_LAYER_LI_CLASS_LIST);

            var modInput = document.createElement('input');
            addStylesToElement(modInput, MODULE_LAYER_INPUT_CLASS_LIST);
            setInputAttributes(modInput);

            var modLabel = document.createElement('label');
            addStylesToElement(modLabel, MODULE_LAYER_LABEL_CLASS_LIST);
            setLabelAttributes(modLabel);

            var modSpan = document.createElement('span');
            modSpan.innerHTML = name;

            modUl.appendChild(modLi);
            modLi.appendChild(modInput);
            modLi.appendChild(modLabel);
            modLabel.appendChild(modSpan);

            currentModule = modLi;
            currentFaculty.appendChild(modUl);
            break;

        case LESSER_MODULE_LAYER:
            var lesUl = document.createElement('ul');
            addStylesToElement(lesUl, LESSER_LAYER_UL_CLASS_LIST);

            var lesLi = document.createElement('li');
            addStylesToElement(lesLi, LESSER_LAYER_LI_CLASS_LIST);

            var lesInput = document.createElement('input');
            addStylesToElement(lesInput, LESSER_LAYER_INPUT_CLASS_LIST);
            setInputAttributes(lesInput);

            var lesLabel = document.createElement('label')
            addStylesToElement(lesLabel, LESSER_LAYER_LABEL_CLASS_LIST);
            setLabelAttributes(lesLabel);

            var lesSpan = document.createElement('span');
            lesSpan.innerHTML = name;

            lesUl.appendChild(lesLi);
            lesLi.appendChild(lesInput);
            lesLi.appendChild(lesLabel);
            lesLabel.appendChild(lesSpan);

            currentLesserModule = lesLi;
            currentModule.appendChild(lesUl);
            break;

        case LECTURE_LAYER:
            var lecUl = document.createElement('ul');
            addStylesToElement(lecUl, LECTURE_LAYER_UL_CLASS_LIST);

            var lecLi = document.createElement('li');
            addStylesToElement(lecLi, LECTURE_LAYER_LI_CLASS_LIST);

            var lecA = document.createElement('a');
            addStylesToElement(lecA, LECTURE_LAYER_A_CLASS_LIST);
            lecA.setAttribute("href", "#0");

            var lecSpan = document.createElement('span');
            lecSpan.innerHTML = name;

            lecUl.appendChild(lecLi);
            lecLi.appendChild(lecA);
            lecA.appendChild(lecSpan);
            lecSpan.onclick = function(){showLectureDetails(lectureId)};

            if(!lectureFound){
                lecSpan.style.setProperty("color", "#9a9da1", "important");
                lecSpan.onclick = null;
            }

            currentLesserModule.appendChild(lecUl);
            break;
    }
}

// This function triggers on clicking a lecture-level entry in the accordion
// It creates a new div with overlay-properties and inserts it into the page
// The Overlay-div contains several <p> elements which are filled with details (time, location) etc. of the clicked lecture
function showLectureDetails(lectureId){
    lectureDetailOverlay = document.createElement("div");
    lectureDetailOverlay.classList.add("lecture-overlay");
    var currentLectureDetails = lectureList[lectureId];

    createLectureDetailElements();
    fillLectureDetailElements(currentLectureDetails);
    appendChildrenToOverlay();

    lectureDetailOverlay.onclick = function(){hideOverlay()};
    domParent.appendChild(lectureDetailOverlay);
}

function hideOverlay(){
    domParent.removeChild(lectureDetailOverlay);
}

function appendChildrenToOverlay(){
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("overlay-container");
    initAddToTimetableButton();

    containerDiv.appendChild(lectureName);
    containerDiv.appendChild(lectureDay);
    containerDiv.appendChild(lectureStartTime);
    containerDiv.appendChild(lectureEndTime);
    containerDiv.appendChild(lectureLocation);
    containerDiv.appendChild(addToTimetableButton);

    lectureDetailOverlay.appendChild(containerDiv);
}

function initAddToTimetableButton(){
    addToTimetableButton = document.createElement('button');
    addToTimetableButton.onclick = function(){addLectureToTimetable(detailName, detailDay, detailStartTime, detailEndTime, detailLocation)};
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
function fillDetailVariables(details){
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
function addStylesToElement(element, styles){
    for(var i in styles){
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

