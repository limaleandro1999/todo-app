import { 
    TODO_CREATE_REQUEST, 
    TODO_CREATE_REQUEST_COMMIT, 
    TODO_CREATE_REQUEST_ROLLBACK,
    TODO_UPDATE_REQUEST,
    TODO_UPDATE_REQUEST_COMMIT,
    TODO_UPDATE_REQUEST_ROLLBACK,
    TOGGLE_TODO_REQUEST
} from '../actions';

const todoListReducer = (state = [], action) => {
    switch(action.type){
        case TOGGLE_TODO_REQUEST:
            return state.map(todo => {
                if(todo._id === action.todoId || todo.id === action.todoId)
                    return Object.assign({}, todo, { done: !todo.done }); //it can be made like this { ...todo, done: !todo.done }
                
                return todo;
            });
        
        case TODO_CREATE_REQUEST:
            const newTodo = {
                ...action.payload
            };

            return [...state, newTodo];

        case TODO_CREATE_REQUEST_COMMIT:
            console.log('Request completed');
            return state.map(todo => {
                if(todo.id === action.meta.id) {
                    return { ...action.payload.data };
                }
            
                return todo;
            });

        case TODO_CREATE_REQUEST_ROLLBACK:
            console.log('error on try to connect');
            return state;
        
        case TODO_UPDATE_REQUEST:
            return state.map(todo => {
                if(todo._id === action.payload._id) {
                    return action.payload;
                }
            
                return todo;
            });

        case TODO_UPDATE_REQUEST_COMMIT:
            console.log('Request completed');
            return state;

        case TODO_UPDATE_REQUEST_ROLLBACK:
            console.log('error on try to connect');
            return state;
        
        default:  
            return state;
    }
};

export default todoListReducer;