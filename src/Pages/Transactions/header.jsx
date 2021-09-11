import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { color } from '../../Themes/color';

export function TransHeader({type, setType, active, setActive}){
    const pickerRef = React.createRef();

    return(
        <View style={styles.container}>
            <Button
                color={color.dark}
                style={styles.select}
                icon='chevron-down'
                uppercase={false}
                onPress={() => {
                    if (pickerRef) {
                        pickerRef.current.focus();
                    }
                }}
            >
                {type === 'consumption' ? 'vente': type==='all' ? 'tous': type }
            </Button>
            <Picker
                onValueChange={(value, index) =>setType(value)}
                selectedValue={type}
                style={{
                    display: 'none'
                }}
                ref={pickerRef}
            >
                <Picker.Item key="a" label='Tous' value='all' />
                <Picker.Item key="v" label='Vente' value='consumption' />
                <Picker.Item key='r' label='Recharge' value='recharge' />
            </Picker>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
        width: '90%',
        marginLeft: '5%'
    },
    dates: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '60%',
        height: 40,
        borderRadius: 40,
        alignItems: 'center'
    },
    date: {
        display: 'flex',
        width: '33.3%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        borderRadius: 40
    },
    select: {
        backgroundColor: 'white',
        width: '35%',
        height: 40,
        borderRadius: 20
    },
})