var database = firebase.database();
var dbRef = database.ref();

var currentFacultyName, currentModuleName, currentLesserModuleName, currentLectureName;


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
        console.log(currentLesserModuleName);
        createAccordionEntry(currentLesserModuleName, LESSER_MODULE_LAYER);
        getLectureFromLesserModule(lesserModule[i]);
    }

}

function getLectureFromLesserModule(module) {
    if (module.Ueberschrift.hasOwnProperty("Veranstaltung")) {
        var lectures = module.Ueberschrift.Veranstaltung;
        for (var i in lectures) {
            if (lectures[i].hasOwnProperty("VName")) {
                currentLectureName = lectures[i].VName;
                createAccordionEntry(currentLectureName, LECTURE_LAYER);
                createAccordionEntry(currentFacultyName, currentModuleName, currentLesserModuleName, currentLectureName);
            }
        }
    }
}




