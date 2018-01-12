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

var database = firebase.database();

var trainName = '';
var destination = '';
var firstTrainTime = '';
var frequencyMins = '';

