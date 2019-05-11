import types from './types';

const INITIAL_STATE = {
    receiving: false,
    sending: false,
    deleting: '',
    updating: '',
    todos: [
        // { id: 1, task: 'first task', isComplete: false },
        // { id: 2, task: 'second task', isComplete: true },
        // { id: 3, task: 'third task', isComplete: false }
    ]
}

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.DB_REQUEST:
            return {
                ...state,
                receiving: true
            }
        case types.RECEIVED_DATA:
            return {
                ...state,
                todos: [],
                receiving: false,
            }
        case types.DB_SEND:
            return {
                ...state,
                sending: true,
            }
        case types.DB_UPDATE:
            return {
                ...state,
                updating: action.id
            }
        case types.DB_DELETE:
            return {
                ...state,
                deleting: action.id
            }
        case types.GET_TODO:
            return {
                ...state,
                todos: [...state.todos, { id: action.id, task: action.task, isComplete: action.isComplete }]
            };
        case types.ADD_TODO:
            return {
                ...state,
                sending: false,
                todos: [...state.todos, { id: action.id, task: action.task, isComplete: action.isComplete, added: action.added }]
            };
        case types.UPDATE_TODO:
            return {
                ...state,
                updating: '',
                todos: state.todos.map(todo => {
                    if (todo.id === action.id) {
                        return ({
                            id: action.id,
                            task: action.task,
                            isComplete: action.isComplete,
                            added: action.added
                        })
                    } else {
                        return todo;
                    }
                })
            }
        case types.DELETE_TODO:
            return {
                ...state,
                deleting: '',
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        default:
            return state;
    }
}

export default rootReducer;