import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native';
import logo from '../Imgs/logo.png';

export function StartPage(){

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image source={logo} />
        </View>
    )
}