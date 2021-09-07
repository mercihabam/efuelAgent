import React from 'react';
import { StatusBar, Text, View } from "react-native";
import { NavHeader } from './header';

function Nav({children}){

    return(
        <View>
            <StatusBar />
            <NavHeader />
            <Text>Merci Jacob</Text>
            {children}
        </View>
    )
};

export default Nav;