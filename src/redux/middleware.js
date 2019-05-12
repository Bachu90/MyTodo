import actions from './actions';
import firebase from '../config/dbconfig';

const db = firebase.firestore();

const getAllTodos = () => {
    return function (dispatch) {
        // dispatch request action here
        dispatch(actions.requestData());

        // fetch data from db
        db.collection('tasks').orderBy('added').get().then(querySnapshot => {
            // dispatch received data action here
            dispatch(actions.receivedData());

            querySnapshot.docs.forEach(doc => {
                // dispatch getTodo action here
                dispatch(actions.addTodo(doc.id, doc.data().task, doc.data().isComplete, doc.data().added));
            })
        });
    }
};

const addTodo = (task, todos) => {
    return function (dispatch) {
        // dispatch request action here
        dispatch(actions.sendData());

        const time = firebase.firestore.Timestamp.now();
        db.collection('tasks').add({
            task: task,
            isComplete: false,
            added: time
        }).then(() => {
            db.collection('tasks').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if (!todos.find(todo => todo.id === doc.id)) {
                        // dispatch getTodo action here
                        dispatch(actions.addTodo(doc.id, doc.data().task, doc.data().isComplete, time));
                    }
                })
            });
        })
    }
}

const updateTodo = (id, task, isComplete, added) => {
    return function (dispatch) {
        dispatch(actions.updateData(id));
        db.collection('tasks').doc(id).set({
            task,
            isComplete: !isComplete,
            added
        }).then(() => {
            db.collection('tasks').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if (doc.id === id) {
                        // dispatch getTodo action here
                        dispatch(actions.updateTodo(doc.id, doc.data().task, doc.data().isComplete, doc.data().added));
                    }
                })
            });
        })
    }
}

const deleteTodo = (id) => {
    return function (dispatch) {

        // dispatch request action here
        dispatch(actions.deleteData(id));

        db.collection('tasks').doc(id).delete().then(() => {
            dispatch(actions.deleteTodo(id));
        })
    }
}


export default {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo
};