import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA-rCJWhT9tx1r9rTaTNKdoXPhe2Yh5gMo",
    authDomain: "task-scheduler-f33de.firebaseapp.com",
    projectId: "task-scheduler-f33de",
    storageBucket: "task-scheduler-f33de.appspot.com",
    messagingSenderId: "691533491076",
    appId: "1:691533491076:web:32d64e39489e8179e18bd1",
    measurementId: "G-G0WE8DZEV2"
};
// Initialize Firebase
const fbase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fbase;