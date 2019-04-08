import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { addTodo, setTodoText, updateTodo } from '../actions';

import Input from './Input';

class TodoForm extends React.Component {
    onChangeText(text){
        this.props.dispatchSetTodoText(text);
    }

    onPress(){
        const { todo } = this.props;
        
        if(todo.id) {
            this.props.dispatchUpdateTodo(todo);
        } else {
            this.props.dispatchAddTodo(todo.text);
        }
    }

    render(){
        const { text, id }  = this.props.todo;
        return(
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText={text => this.onChangeText(text)}
                        value={text}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => this.onPress()}
                        title={id ? "EDIT" : "ADD"}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 4
    },
    buttonContainer: {
        flex: 1
    }
});

// const mapDispatchToProps = dispatch => {
//     return {
//         dispatchAddTodo: text => dispatch(addTodo(text))
//     }
// }

const mapStateToProps = state => ({
    todo: state.editingTodo
});

const mapDispatchToProps = {
    dispatchAddTodo: addTodo,
    dispatchSetTodoText: setTodoText,
    dispatchUpdateTodo: updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);