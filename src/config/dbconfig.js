import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAEAR-1vfj0kshqAAqzkYb5UhmnjwLuBao",
    authDomain: "grzegorzbach-my-todo.firebaseapp.com",
    databaseURL: "https://grzegorzbach-my-todo.firebaseio.com",
    projectId: "grzegorzbach-my-todo",
    storageBucket: "grzegorzbach-my-todo.appspot.com",
    messagingSenderId: "864316926577"
};
firebase.initializeApp(config);

firebase.firestore().settings({
    timestampsInSnapshots: true
});

export default firebase;