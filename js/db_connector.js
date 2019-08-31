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










