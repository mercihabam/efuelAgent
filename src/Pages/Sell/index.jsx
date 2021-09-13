import React from 'react';
import { ScrollView } from 'react-native';
import { ChooseProduct } from './chooseProduct';

function SellPage({navigation}){

    return(
        <ScrollView>
            <ChooseProduct navigation={navigation} />
        </ScrollView>
    )
};

export default SellPage;