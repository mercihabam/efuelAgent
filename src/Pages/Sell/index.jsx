import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { ChooseProduct } from './chooseProduct';

function SellPage(){

    return(
        <ScrollView>
            <ChooseProduct />
        </ScrollView>
    )
};

export default SellPage;