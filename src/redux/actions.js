import types from './types';

const requestData = () => ({ type: types.DB_REQUEST });

const receivedData = () => ({ type: types.RECEIVED_DATA });

const sendData = () => ({ type: types.DB_SEND });

const updateData = (id) => ({ type: types.DB_UPDATE, id });

const deleteData = (id) => ({ type: types.DB_DELETE, id });

const addTodo = (id, task, isComplete, added) => ({ type: types.ADD_TODO, id, task, isComplete, added });

const updateTodo = (id, task, isComplete, added) => ({ type: types.UPDATE_TODO, id, task, isComplete, added });

const deleteTodo = (id) => ({ type: types.DELETE_TODO, id });


export default {
    requestData,
    receivedData,
    sendData,
    updateData,
    deleteData,
    addTodo,
    updateTodo,
    deleteTodo
};