// Initialize Firebase



 
    var config = {
    apiKey: "AIzaSyCDVFzuLka9LLU5cMxdbYZCFLznFBO8hTA",
    authDomain: "first-firebase-project-9d123.firebaseapp.com",
    databaseURL: "https://first-firebase-project-9d123.firebaseio.com",
    projectId: "first-firebase-project-9d123",
    storageBucket: "first-firebase-project-9d123.appspot.com",
    messagingSenderId: "1094961999356"
  };
  

  	firebase.initializeApp(config);


 	 // Reference for firebase database

  	var database = firebase.database();

  


	// Add new class with "click" EVENT

	$("#addClass").on("click", function(event) {

		event.preventDefault();

		// Capture input values

		var className = $("#classNameInput").val().trim();
		var location = $("#locationInput").val().trim();
		var classTime = $("#classTimeInput").val().trim();
		var frequency = $("#frequencyInput").val().trim();
	
		// Create new "workout newclass" object

		var newClass = {
			className: className,
			location: location,
			classTime: classTime,
			frequency: frequency

		};


		// Inserts into database

		database.ref().push(newClass);

		// empties the inputs of their values

		$("#classNameInput").val("");
  		$("#locationInput").val("");
  		$("#classTimeInput").val("");
  		$("#frequencyInput").val("");


		});

		
	// Creates Firebase EVENT for adding values to the database and later updating the html
	
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	console.log(childSnapshot.val());

  	// FUNCTION CALL from function defined outside of this event

  	updateTable(childSnapshot);

	});	

	// FUNCTION


	function updateTable (childSnapshot) {

  		console.log(childSnapshot);


  		// Store everything into a variable.

  		var className = childSnapshot.val().className;
  		var location = childSnapshot.val().location;
  		var classTime = childSnapshot.val().classTime;
  		var tFrequency = childSnapshot.val().frequency;

  		// logs class Info in console

  		console.log("Class Name: " + className);
  		console.log("Location: " + location);
  		console.log("First Class Time: " + classTime);
  		console.log("Frequency: " + tFrequency);

  		// time conversions

  		var firstClassConverted = moment(classTime, "HH:mm a").subtract(1, "days");

  			console.log("First Class Converted: " + moment(firstClassConverted).format("HH:mm a"));

  		var currentTime = moment(currentTime);

  			console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm a"));

  		var diffTime = moment(currentTime).diff(moment(firstClassConverted), "minutes");
  		
  			console.log("DIFFERENCE IN TIME: " + diffTime);

  		var tRemainder = diffTime % tFrequency;
  		
  			console.log("Remainder: " + tRemainder);

  		var minAway = tFrequency - tRemainder;
  		
  			console.log("MINUTES TILL NEXT CLASS: " + minAway);

  		var nextClass = moment(currentTime).add(minAway, "minutes");
  		
  			console.log("CLASS TIME: " + moment(nextClass).format("HH:mm a"));



  		// Add "workout class" data into the table

  		$("#classSchedule > tbody").append("<tr><td>" + className + "</td><td>" + location + "</td><td>"  + moment(firstClassConverted).format("HH:mm a") + "</td><td>" + tFrequency + "</td><td>" + minAway + "</td></tr>");


	}



	// update clock

	var datetime, date;


	// FUNCTION

	function updateTime() {

  		date = moment(new Date())
  		$('#datetime').html(date.format('dddd, MMMM Do YYYY, hh:mm:ss a'));
	};

	
	// DOCUMENT READY FUNCTION CALLING THE updateTime() FUNCTION

	$(document).ready(function(){

    	updateTime();
    	setInterval(updateTime, 1000);

    // setInterval(updateCount, 60000); ??
	});


		

	