import React, { useState, useEffect } from 'react';
import { ScrollView, Text, AsyncStorage, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import Logo from '../../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List( {navigation} ) {
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {  
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
        console.log(techs);
    }, [])

    async function backHandleSubmit() { 
        // console.log("Botão voltar")
        AsyncStorage.clear();
        navigation.navigate('Login')
    }

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
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 20
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

