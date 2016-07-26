var bio = {
    "name" : "Christopher Reyes",
    "role" : "Web Developer / Student",
    "contacts" : {
        "mobile" : "817-908-4277",
        "email" : "christophereyes.cr@gmail.com",
        "github" : "christophereyes"
    },
    "welcomeMessage" : "Brought to you by : CHRISTOPHER REYES",
    "skills": ["HTML","CSS","Python","JavaScript"],
    "biopic": "img/hiking.JPG"
}


$(".small2").append(bio.name);
$(".small2").append(" : ");
$(".small2").append(bio.role);

var portPic = HTMLbioPic.replace("%data%", bio.biopic);

$("#topContacts").append(portPic);


var education = {
    "schools" : [
    {"name" : "The University of Texas at Arlington",
    "location": "Arlington, Texas",
    "Degree": "Bachelors",
    "Major": "Computer Science"
}]
}
for(school in education.schools) {
    $("#education").append(HTMLschoolStart);
    var formattedSchool = HTMLschoolName.replace("%data%", education.schools[school].name);
    $(".education-entry:last").append(formattedSchool);
    var formattedSchoolocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
    $(".education-entry:last").append(formattedSchoolocation);
    var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].Major);
    $(".education-entry:last").append(formattedMajor);

}
var work = {
    "jobs" : [
    {"employer": "AT&T",
    "title": "Sales Representative",
    "location": "Hurst, Texas",
    "dates": "09/2009 - Current",
    "description": "Sales, and support of wireless solutions in a fast paced dynamic enviroment."
    }]
}
for (job in work.jobs) {
    $("#workExperience").append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);
    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    $(".work-entry:last").append(formattedDates);
    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
    $(".work-entry:last").append(formattedDescription);
}
var projects = {
    "projects" : [
    {"title": "Online Portfolio",
    "Description" : ""
    }]
}

if(document.getElementsByClassName('work-entry').length === 0) {
      document.getElementById('workExperience').style.display = 'none';
    }
if(document.getElementsByClassName('project-entry').length === 0) {
      document.getElementById('projects').style.display = 'none';
    }
if(document.getElementsByClassName('education-entry').length === 0) {
      document.getElementById('education').style.display = 'none';
    }
/*if(document.getElementsByClassName('flex-item').length === 0) {
      document.getElementById('lets-connect').style.display = 'none';
    }*/
if(document.getElementById('map') === null) {
      document.getElementById('mapDiv').style.display = 'none';
    }
