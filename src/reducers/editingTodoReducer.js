import { 
    SET_TODO_TEXT, 
    SET_EDITING_TODO, 
    TODO_CREATE_REQUEST,
    TODO_UPDATE_REQUEST
} from '../actions';

const INITIAL_STATE = {
    id: null,
    text: '',
    done: false
};

const editingTodoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_TODO_TEXT:
            return {
                ...state,
                text: action.text
            };
        
        case TODO_UPDATE_REQUEST:
        case TODO_CREATE_REQUEST:
            return INITIAL_STATE;

        case SET_EDITING_TODO:
            return action.todo
        
        default:
            return state;
    }
};

export default editingTodoReducer;