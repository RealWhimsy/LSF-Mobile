var database = firebase.database();
var dbRef = database.ref();
var lectureList = [];
var currentLectureId = 0;

var currentFacultyName, currentModuleName, currentLesserModuleName, currentLectureName, lectureStartTime, lectureEndTime, lectureDay, lectureLocation;


getFacultiesFromDb();


function getFacultiesFromDb() {
    dbRef.child("Studiengänge").once('value', function (snapshot) {
        var faculties = snapshot.val();
        for (var i in faculties) {
            currentFacultyName = faculties[i].Name;
            createAccordionEntry(currentFacultyName, FACULTY_LAYER);
            getModulesFromFaculty(faculties[i]);
        }
    });

}

function getModulesFromFaculty(faculty) {
    var modules = faculty.Tree;
    for (var i in modules) {
        currentModuleName = modules[i].Ueberschrift.UeBez;
        createAccordionEntry(currentModuleName, MODULE_LAYER);
        getLesserModuleFromModule(modules[i]);
    }
}

function getLesserModuleFromModule(module) {
    var lesserModule = module.Vorlesung;
    for (var i in lesserModule) {
        currentLesserModuleName = lesserModule[i].Ueberschrift.UeBez;
        createAccordionEntry(currentLesserModuleName, LESSER_MODULE_LAYER);
        getLectureFromLesserModule(lesserModule[i]);
    }

}

function getLectureFromLesserModule(module) {
    if (Object.keys(module.Ueberschrift).length >= 2) {
        var lectures = module.Ueberschrift.Veranstaltung;
        for (var i in lectures) {
            getLectureDetails(lectures[i]);
            addLectureToList();
            // The following if-clause is a dirty fix for the inconsistent json-data-structure used. Some modules, which contain
            // only one lecture are structured differently from modules that contain two or more lectures. This is a workaround,
            // but ideally data-structure should be adjusted and made more consistent
            if(currentLectureName === undefined) {
                currentLectureName = module.Ueberschrift.Veranstaltung.VName;
                createAccordionEntry(currentLectureName, LECTURE_LAYER, currentLectureId, true);
                currentLectureId++;
                break;
            }

            createAccordionEntry(currentLectureName, LECTURE_LAYER, currentLectureId, true);
            currentLectureId++;
        }
    } else {
        createAccordionEntry("No lectures here!", LECTURE_LAYER, currentLectureId, false);
        currentLectureId++;
    }

}

function addLectureToList(){
    lectureList.push({
        LECTURE_ID_KEY : currentLectureId,
        LECTURE_NAME_KEY : currentLectureName,
        LECTURE_START_TIME_KEY : lectureStartTime,
        LECTURE_END_TIME_KEY : lectureEndTime,
        LECTURE_LOCATION_KEY : lectureLocation,
        LECTURE_DAY_KEY : lectureDay,
    });
}

function getLectureDetails(lecture){
    currentLectureName = lecture.VName;
    try {
        lectureStartTime = lecture.VZeit.VZBeginn;
        lectureEndTime = lecture.VZeit.VZEnde;
        lectureDay = lecture.VZeit.VZWoTagKurz;
        lectureLocation = lecture.VZeit.VZRaum.VZRaumName;
    } catch (e) {
        lectureStartTime, lectureEndTime, lectureDay, lectureLocation = null;
    }

}




