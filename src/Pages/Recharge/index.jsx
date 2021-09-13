import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ChooseProduct } from './chooseProduct';

function RechargePage({navigation}){

    return(
        <ScrollView>
            <ChooseProduct navigation={navigation} />
            <Toast ref={ref =>Toast.setRef(ref)} />
        </ScrollView>
    )
};

export default RechargePage;