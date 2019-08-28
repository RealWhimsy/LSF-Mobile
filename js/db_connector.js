var database = firebase.database();
var dbRef = database.ref();
var lectureList = [];
var currentLectureId = 0;

var faculty, currentModule, lesserModule, lectureName;

var courses;

getCoursesFromDb();

// This function gets all entries from the top-level of the database.
// It starts cascading downwards towards the lower level for each entry. The downwards cascade continues in the other function for lower levels
// These functions get the names of their respective level (which are later displayed as 'folder names') until the lowest level is reached (a single lecture entry)

function getCoursesFromDb() {
    dbRef.once('value', function (snapshot) {
        courses = snapshot.val();
        for (var i in courses) {
            if (courses[i].hasOwnProperty("LECTURE_NAME_KEY")) {
                getCourseDetails(courses[i]);
                createAccordionEntry(faculty, currentModule, lesserModule, lectureName);
            }
        }
    });

}

function getCourseDetails(course) {
    faculty = course.LECTURE_FACULTY_KEY;
    currentModule = course.LECTURE_MODULE_KEY;
    lesserModule = course.LECTURE_LESSER_MODULE_KEY;
    lectureName = course.LECTURE_NAME_KEY;
}

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

// This function is responsible for the lowest-level entries, which are single lectures
// If no lecture is found in the parent folder, it instead creates a dummy entry which says "No lectures here!"
// The function that creates the entry for this level is different from the ones above, it takes an additional "currentLectureId" parameter
// This parameter is later used in the onclick function to determine the exact lecture that was clicked
function getLectureFromLesserModule(module) {
    if (Object.keys(module.Ueberschrift).length >= 2) {
        var lectures = module.Ueberschrift.Veranstaltung;
        for (var i in lectures) {
            getLectureDetails(lectures[i]);
            addLectureToList();
            // The following if-clause is a dirty fix for the inconsistent json-data-structure used. Some modules, which contain
            // only one lecture are structured differently from modules that contain two or more lectures. This is a workaround,
            // but ideally data-structure should be adjusted and made more consistent
            if (currentLectureName === undefined) {
                currentLectureName = module.Ueberschrift.Veranstaltung.VName;
                createAccordionEntry(currentLectureName, LECTURE_LAYER, currentLectureId, true);
                currentLectureId++;
                break;
            }

            createAccordionEntry();
            currentLectureId++;
        }
    } else {
        createAccordionEntry("No lectures here!", LECTURE_LAYER, currentLectureId, false);
    }

}

// This function adds a single lecture to an array of lectures
// This can later be used to get details about lectures, by looking for their ID in the array
function addLectureToList() {
    lectureList.push({
        LECTURE_ID_KEY: currentLectureId,
        LECTURE_FACULTY_KEY: currentFacultyName,
        LECTURE_MODULE_KEY: currentModuleName,
        LECTURE_LESSER_MODULE_KEY: currentLesserModuleName,
        LECTURE_PATH: currentFacultyName + ";" + currentModuleName + ";" + currentLesserModuleName,
        LECTURE_NAME_KEY: currentLectureName,
        LECTURE_START_TIME_KEY: lectureStartTime,
        LECTURE_END_TIME_KEY: lectureEndTime,
        LECTURE_LOCATION_KEY: lectureLocation,
        LECTURE_DAY_KEY: lectureDay,
    });
    resetLectureArrays();
}

function resetLectureArrays() {
    lectureStartTime = [];
    lectureEndTime = [];
    lectureDay = [];
    lectureLocation = [];
}

function getLectureDetails(lecture) {
    currentLectureName = lecture.VName;
    // Some lectures have those keys, some do not. This is a dirty fix to not make the site crash or throw excess errors. Instead, database structure should be made more consistent in the future
    if (lecture.hasOwnProperty("VZeit")) {
        if (lecture.VZeit.hasOwnProperty("VZBeginn")) {
            lectureStartTime.push(lecture.VZeit.VZBeginn);
            lectureEndTime.push(lecture.VZeit.VZEnde);
            lectureDay.push(lecture.VZeit.VZWoTagKurz);
            if (lecture.VZeit.hasOwnProperty("VZRaum")) {
                lectureLocation.push(lecture.VZeit.VZRaum.VZRaumName);
            } else {
                lectureLocation.push("Unknown Location");
            }

        } else {
            for (var i in lecture.VZeit) {
                lectureStartTime.push(lecture.VZeit[i].VZBeginn);
                lectureEndTime.push(lecture.VZeit[i].VZEnde);
                lectureDay.push(lecture.VZeit[i].VZWoTagKurz);
                if (lecture.VZeit[i].hasOwnProperty("VZRaum")) {
                    lectureLocation.push(lecture.VZeit[i].VZRaum.VZRaumName);
                } else {
                    lectureLocation.push("Unknown Location");
                }

            }
        }


    }
}








