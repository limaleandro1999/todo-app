import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { connect } from 'react-redux';

import TodoListItem from './TodoListItem';
import { toggleTodo, setEditingTodo } from '../actions';

const TodoList = ({ todos, dispatchToggleTodo, dispatchEditingTodo }) => (
    <View>
        {todos.map((todo, index) => (
            <TodoListItem 
                key={index} 
                todo={todo}
                onPressTodo={() => dispatchToggleTodo(todo.id)}
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
    dispatchToggleTodo: toggleTodo,
    dispatchEditingTodo: setEditingTodo
};
  
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);