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

