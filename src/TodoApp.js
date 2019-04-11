import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import rootReducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';
import axios from 'axios';

const effect = (effect, _action) => {
    console.log('request made')

    switch(effect.method){
        case 'POST':
            return axios.post(effect.url, effect.body);
        
        case 'PUT':
            return axios.put(effect.url, effect.body);
            
        default:
            return axios.get(effect.url);
    }
};

const discard = (error, _action, _retries) => {
    console.log('request discard')
    const { response } = error;
    return response && 400 <= response.status && response.status < 500;
};

const detectNetwork = callback => {
    setInterval(async () => {
        console.log('network check')
        await axios.head('http://192.168.0.110:3000/ping').then(() => {
            callback({ 
                online: true
            })
        }).catch(() => {
            callback({
                online: false
            })
        });
    }, 2000);
};

const store = createStore(
    rootReducer,  
    offline({
        ...offlineConfig,
        effect,
        discard
    })
    // compose(
    //     devToolsEnhancer(),
    //     offline({
    //         ...offlineConfig,
    //         effect,
    //         discard,
    //         detectNetwork
    //     })
    // )
);

export default class TodoApp extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <TodoForm />
                    <TodoList />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});