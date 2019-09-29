var database = firebase.database();
var dbRef = database.ref();

var faculty, currentModule, lesserModule, lectureName;

var courses;

getCoursesFromDb();


// This function gets all entries from the database
// For each found dataset, an entry in the course drawer will be created by calling the function createAccordionEntry in accordionFiller.js
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










