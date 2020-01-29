import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import api from '../services/api';
import styles from './SpotList_styles';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data);
        };
        loadSpots();
    }, [])

    async function handleSubmit(id) {
        navigation.navigate('Book', { id })
    }

    function teste(item) {
        const tt = item.split(':');
        // const t = item.split(':');
        console.log(`'${tt[0]}://192.168.0.106:${tt[2]}'`);
    }
    
    return(
        <View style = { styles.container }>
            <Text style = { styles.title }>Empresas incréveis que utilizam <Text style = {styles.bold}>{tech}</Text></Text>
            <FlatList 
                style = { styles.list }
                data = { spots }
                keyExtractor = { spot => spot._id }
                horizontal
                showsHorizontalScrollIndicator = {false}
                renderItem = {({ item }) => (
                    <View style = { styles.listItem }>
                        <Image style = { styles.thumbnail } source = {{uri:"https://reactjs.org/logo-og.png"}} />
                        {/* <Image style = { styles.thumbnail } source = {{ uri: `'${item.thumbnail_url}'` }} /> */}
                        <Text style = { styles.company }>{ item.company }</Text>
                        <Text style = { styles.price }> { item.price ? `R$${item.price}/dia` : 'Gratuito' }</Text>
                        {/* <TouchableOpacity onPress = {() => teste(item.thumbnail_url) } style = { styles.button }> */}
                        <TouchableOpacity onPress = {() => handleSubmit(item._id) } style = { styles.button }>
                            <Text style = { styles.buttonText }>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
};

export default withNavigation(SpotList);