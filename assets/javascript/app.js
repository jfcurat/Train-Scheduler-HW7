// .js here
console.log('app.js linked!');

// initialize firebase
var config = {
    apiKey: "AIzaSyCTxNWrFMUqkE8dLF4HJkjqkQPRB2ZZCpQ",
    authDomain: "train-scheduler-752d0.firebaseapp.com",
    databaseURL: "https://train-scheduler-752d0.firebaseio.com",
    projectId: "train-scheduler-752d0",
    storageBucket: "",
    messagingSenderId: "836362156835"
};
firebase.initializeApp(config);

// reference to database
var database = firebase.database();

// vars to track user input
var trainName = '';
var trainDestination = '';
var trainFirstArrival = '';
var trainFrequencyMins = '';

// vars to track next arrival and mins away
var nextArrival = '';
var minsAway = 0;

// var to track number of data entries
var entryNumber = 1;

// object to avoid in-line declaration on push request, will give key:value structure to firebase database entries
var trainInfo = {
    name: trainName,
    destination: trainDestination,
    firstArrival: trainFirstArrival,
    frequencyMins: trainFrequencyMins,
};

// function to push trainInfo to database
function addTrainInfo(trainInfo) {
    firebase.database().ref().push(trainInfo);
}

$('#submitButton').on('click', function submitForm(event) {
    // prevent submit from reloading page
    event.preventDefault();

    // get info from input boxes and save to trainInfo object
    trainInfo.name = $('#trainNameInputBox').val().trim();
    trainInfo.destination = $('#trainDestinationInputBox').val().trim();
    trainInfo.firstArrival = $('#trainFirstArrivalInputBox').val().trim();
    trainInfo.frequencyMins = $('#trainFrequencyInputBox').val().trim();

    // log user input in console
    console.log('user input name = ' + JSON.stringify(trainInfo.name));
    console.log('user input destination = ' + JSON.stringify(trainInfo.destination));
    console.log('user input first arrival = ' + JSON.stringify(trainInfo.firstArrival));
    console.log('user input frequency = ' + JSON.stringify(trainInfo.frequencyMins));

    // call the function that pushes trainInfo to database
    addTrainInfo(trainInfo);
    console.log('trainInfo = ' + JSON.stringify(trainInfo, null, 4));

    // clear input boxes after submmit
    $('#trainNameInputBox').val('');
    $('#trainDestinationInputBox').val('');
    $('#trainFirstArrivalInputBox').val('');
    $('#trainFrequencyInputBox').val('');
});

// when new data item is added to database, log in console and then use it to make new rows in trainScheduleTableBody
database.ref().on('child_added', function(childSnapshot) {
    console.log('the snapshot = ' + childSnapshot.val().name, childSnapshot.val().destination, childSnapshot.val().firstArrival, childSnapshot.val().frequencyMins);

    $('#trainScheduleTableBody').append('<tr>' + '<th scope="row">' + entryNumber + '</th>' + '<td>' + childSnapshot.val().name + '</td>' + '<td>' + childSnapshot.val().destination + '</td>' + '<td>' + childSnapshot.val().firstArrival + '</td>' + '<td>' + childSnapshot.val().frequencyMins);

    entryNumber++;
});
