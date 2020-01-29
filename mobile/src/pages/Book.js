import React, { useState } from 'react';
import { Alert, Text, AsyncStorage, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book( {navigation} ) {
    
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    
    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada!');
        navigation.navigate('List');
    }

    function cancelHandleSubmit() {
        navigation.navigate('List');
    }

    return ( 
    <SafeAreaView style = { styles.container }>
        <Text style = { styles.label }>Data de interesse *</Text>
            <TextInput 
                style = { styles.input } 
                placeholder="Qual data você quer marcar?" 
                placeholderTextColor="#999" 
                autoCapitalize="words" 
                autoCorrect={false}
                value = { date }
                onChangeText = { setDate }
        />
        <TouchableOpacity onPress = {handleSubmit} style = { styles.button }>
            <Text style = { styles.buttonText }>Confirmar reserva!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {cancelHandleSubmit} style = { [styles.button, styles.cancelButton] }>
            <Text style = { styles.buttonText }>Cencelar</Text>
        </TouchableOpacity>

    </SafeAreaView>
)}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: '#CCC',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});