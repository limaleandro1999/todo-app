export const SET_TODO_TEXT = 'SET_TODO_TEXT';
export const setTodoText = text => ({ 
    type: SET_TODO_TEXT,
    text
});

export const SET_EDITING_TODO = 'SET_EDITING_TODO';
export const setEditingTodo = todo => ({ 
    type: SET_EDITING_TODO,
    todo
});

export const TODO_CREATE_REQUEST = 'TODO_CREATE_REQUEST';
export const TODO_CREATE_REQUEST_COMMIT = 'TODO_CREATE_REQUEST_COMMIT';
export const TODO_CREATE_REQUEST_ROLLBACK = 'TODO_CREATE_REQUEST_ROLLBACK';
export const todoCreateRequest = todo => ({
    type: TODO_CREATE_REQUEST,
    payload: todo,
    meta: {
      offline: {
        effect: { url: 'http://192.168.0.102:3000/todos', method: 'POST', body: todo },
        commit: { type: TODO_CREATE_REQUEST_COMMIT, meta: todo },
        rollback: { type: TODO_CREATE_REQUEST_ROLLBACK, meta: todo }
      }
    }
});

export const TODO_UPDATE_REQUEST = 'TODO_UPDATE_REQUEST';
export const TODO_UPDATE_REQUEST_COMMIT = 'TODO_UPDATE_REQUEST_COMMIT';
export const TODO_UPDATE_REQUEST_ROLLBACK = 'TODO_UPDATE_REQUEST_ROLLBACK';
export const todoUpdateRequest = todo => ({
    type: TODO_UPDATE_REQUEST,
    payload: todo,
    meta: {
      offline: {
        effect: { url: `http://192.168.0.102:3000/todos/${todo._id}`, method: 'PUT', body: todo },
        commit: { type: TODO_UPDATE_REQUEST_COMMIT, meta: todo },
        rollback: { type: TODO_UPDATE_REQUEST_ROLLBACK, meta: todo }
      }
    }
});

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
export const TOGGLE_TODO_REQUEST_COMMIT = 'TOGGLE_TODO_REQUEST_COMMIT';
export const TOGGLE_TODO_REQUEST_ROLLBACK = 'TOGGLE_TODO_REQUEST_ROLLBACK';
export const toggleTodoRequest = todo => ({
    type: TOGGLE_TODO_REQUEST,
    todoId: todo._id || todo.id,
    meta: {
        offline: {
        effect: { url: `http://192.168.0.102:3000/todos/${todo._id}`, method: 'PUT', body: { done: !todo.done } },
        commit: { type: TOGGLE_TODO_REQUEST_COMMIT, meta: todo },
        rollback: { type: TOGGLE_TODO_REQUEST_ROLLBACK, meta: todo }
        }
    }
});