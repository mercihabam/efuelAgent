import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export function OverTitle(){
    const [active, setActive] = useState('week');
    const [selectValue, setSelectedValue] = useState('recharge');
    const pickerRef = React.createRef();

    return(
        <View style={styles.container}>
            <View style={styles.dialog}>
                <Button
                    color="#F27405"
                    style={styles.select}
                    icon='chevron-down'
                    uppercase={false}
                    onPress={() => {
                        if (pickerRef) {
                            pickerRef.current.focus();
                        }
                    }}
                >
                    {selectValue}
                </Button>
                <Picker
                    onValueChange={(value, index) =>setSelectedValue(value)}
                    selectedValue={selectValue}
                    style={{
                        display: 'none'
                    }}
                    ref={pickerRef}
                >
                    <Picker.Item key="v" label='Vente' value='sell' />
                    <Picker.Item key='r' label='Recharge' value='recharge' />
                </Picker>
                <View style={styles.dates}>
                    <TouchableOpacity style={[ styles.date, active === 'year' && {
                        backgroundColor: '#F27405'
                    } ]} onPress={() =>setActive('year')}>
                        <Text style={[
                            { textAlign: 'center', fontSize: 10 }
                        ]}>ANNEE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ styles.date, active === 'month' && {
                        backgroundColor: '#F27405'
                    } ]} onPress={() =>setActive('month')}>
                        <Text style={[
                            { textAlign: 'center', fontSize: 10 }
                        ]}>MOIS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ styles.date, active === 'week' && {
                        backgroundColor: '#F27405'
                    } ]} onPress={() =>setActive('week')}>
                        <Text style={[
                            { textAlign: 'center', fontSize: 10 }
                        ]}>SEMAINE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blockStats}>
                <View>
                    <CircularProgress
                        maxValue={15000}
                        value={80}
                        textColor='#595859'
                        activeStrokeColor='#A65C02'
                        
                    />
                    <Text>LITRES VENDUS</Text>
                </View>

                <View>
                    <CircularProgress
                        maxValue={15000}
                        value={10}
                        textColor='#595859'
                        activeStrokeColor='#A65C02'
                        
                    />
                    <Text>BONUS VENDUS</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        borderColor: '#595859',
        borderTopWidth: 2
    },
    dialog: {
        width: '100%',
        backgroundColor: '#595859',
        marginTop: 5,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 80
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
    blockStats: {
        width: '90%',
        marginLeft: '5%',
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 40,
        // position: 'absolute',
        marginTop: -50,
        borderRadius: 20,
        marginBottom: 20
    },
    // round: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 100,
    //     borderWidth: 6
    // }
})