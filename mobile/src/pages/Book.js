import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function Book( {navigation} ) {
    
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    
    async function handleSubmit() {
        console.log("Botão funcionando");
    }

    return ( 
    <SafeAreaView>
        <Text>{ id }</Text> 
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
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
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

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});