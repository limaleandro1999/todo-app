import React from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import TodoListItem from './TodoListItem';
import { setEditingTodo, toggleTodoRequest } from '../actions';

const TodoList = ({ todos, dispatchEditingTodo, dispatchToggleTodoRequest }) => (
    <View>
        {todos.map((todo, index) => (
            <TodoListItem 
                key={index} 
                todo={todo}
                onPressTodo={() => dispatchToggleTodoRequest(todo)}
                onLongPress={() => dispatchEditingTodo(todo)}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    const { todos } = state;
    return { todos };
};

const mapDispatchToProps = {
    dispatchEditingTodo: setEditingTodo,
    dispatchToggleTodoRequest: toggleTodoRequest
};
  
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);