import React, { useState, useEffect } from 'react';
import { ScrollView, Text, AsyncStorage, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

import Logo from '../../assets/logo.png';
import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List( {navigation} ) {
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.106:4200', {
                query: { user_id }
            })
            
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA!' : 'REJEITADA!'}`)
            })
        })
    }, []);

    useEffect(() => {  
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);

    async function backHandleSubmit() { 
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style = { styles.container }>
           <Image style = { styles.logo } source = { Logo }/>
            <ScrollView>
           {techs.map(tech => <SpotList key = { tech } tech={tech} />)}
           </ScrollView>
           
           {/* Back button */}
           <TouchableOpacity onPress = {backHandleSubmit} style = { styles.button }>
               <Text style = { styles.buttonText }>Sair</Text>
           </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 70,
    },

    button: {
        height: 42,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});