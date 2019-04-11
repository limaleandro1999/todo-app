import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { 
    setTodoText, 
    todoCreateRequest, 
    todoUpdateRequest 
} from '../actions';

import Input from './Input';

class TodoForm extends React.Component {
    onChangeText(text){
        this.props.dispatchSetTodoText(text);
    }

    onPress(){
        const { todo } = this.props;
        
        if(todo._id) {
            this.props.dispatchTodoUpdateRequest(todo);
        } else {
            this.props.dispatchTodoCreateRequest({ id: new Date(), text: todo.text, done: todo.done });
        }
    }

    render(){
        const { text, _id }  = this.props.todo;
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
                        title={_id ? "EDIT" : "ADD"}
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
    dispatchSetTodoText: setTodoText,
    dispatchTodoCreateRequest: todoCreateRequest,
    dispatchTodoUpdateRequest: todoUpdateRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);