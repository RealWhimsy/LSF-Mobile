# LSF-Mobile
A responsive website serving as a prototype for an electronic course catalaogue for students of the University of Regensburg. This project was created during the course of Lukas Jackermeier's bachelor thesis "Design and Implementation of a Mobile Friendly Course Catalogue for Students of the University of Regensburg". [LSF-Mobile can be visited here](https://lsf-app.firebaseapp.com). The website is intended for use on mobile devices, but of course it can be still accessed and used from desktop browsers as well.


## Features
The website implements access to three features:
- Course catalaogue
- Timetable
- Search function

For quick navigation between all functions, there is a static navigation bar placed at the bottom of the screen. By tapping the buttons, you can quickly swap between the different parts of the site.
The functions will be explained briefly in the following chaperts.

## Course Catalogue
The course catalogue makes up the core part of LSF mobile and allows students to browse the courses for the current semester. The data stems from XML data dumps of the current electronic course catalogue ([LSF](https://lsf.ur.de)) and includes courses of both 'Medieninformatik' and 'Informationswissenschaft' from the winter semester 2019/20. The data is displayed in a nested drawer and can be explored by clicking on the the folders. By clicking them, they expand or collapse, revealing lower levels of the folder structure. At the lowest level, there are no more folders, but instead courses. These can be clicked to open up a detail view, whichs reveals detailed information, like time and location. The courses can also be added to the timetable from there.

## Timetable
The timetable is where students save and view all their chosen courses. It is empty by default, should the student add any courses they will be displayed in their correct time slot. By clicking on an entry in the timetable, a detail view can be opened. From this view, the entry can be modified or deleted.

## Search function
The search function allows searching courses without having to navigate the folder structure, by entering keywords. There are four different options for search paramters:
- Course name
- Module
- Start time
- End time

The course and module name parameters accept text input, the start and end time parameters offer a time picker dialogue in order to prevent wrong user input. The search can be started, by clicking the search button with the magnifiyng glass icon. The search results behave the same way the course catalogue entries do, and can be added to the timetable from their detail view.

## Issues
Due to the limited timeframe that was available for the implementation of this project, there are still some bugs that impact the overall user experience and usability of the website. Some of the known bugs are listed in the [Issues](https://github.com/kappa4head/LSF-App/issues) section of this repository. Should you encounter any bugs that are not yet listed, we encourage you to submit a new issue there.