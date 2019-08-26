
var currentFaculty, currentModule, currentLesserModule;
var accordionSection = document.getElementById('accordion-section');
var accordionList = document.getElementById('accordion-list');
var domParent = document.getElementById("body");

var lectureDetailOverlay, lectureDetailList, lectureDay, lectureStartTime, lectureEndTime, lectureLocation, lectureName, addToTimetableButton;

var currentID = 0;

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
    addToTimetableButton.onclick = function(){addLectureToTimetable(lectureName, lectureDay, lectureStartTime, lectureEndTime, lectureLocation)};
    addToTimetableButton.innerHTML = "Add to timetable";
}


function fillLectureDetailElements(details) {
    lectureName.innerHTML = "Lecture: " + details.LECTURE_NAME_KEY;
    lectureStartTime.innerHTML = "Start Time: " + details.LECTURE_START_TIME_KEY;
    lectureEndTime.innerHTML = "End Time: " + details.LECTURE_END_TIME_KEY;
    lectureLocation.innerHTML = "Location: " + details.LECTURE_LOCATION_KEY;
    lectureDay.innerHTML = "Weekday: " + details.LECTURE_DAY_KEY;
}

function createLectureDetailElements() {
    lectureDetailList = document.createElement("div");
    lectureName = document.createElement("p");
    lectureStartTime = document.createElement("p");
    lectureEndTime = document.createElement("p");
    lectureLocation = document.createElement("p");
    lectureDay = document.createElement("p");
}

function addLectureToTimetable(name, day, startTime, endTime, location) {

}


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

