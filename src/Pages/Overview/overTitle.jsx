import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { getSelledStocks } from '../../Redux/actions/stocksActions';
import { useDispatch, useSelector } from 'react-redux';
import { agentId } from '../../Utils/helpers';
import moment from 'moment';

export function OverTitle({selectValue, setSelectedValue}){
    const [active, setActive] = useState('day');
    const pickerRef = React.createRef();
    const {dataStock} = useSelector(({ stocks: {selled} }) =>selled);
    const [totalSelled, setTotalSelled] = useState();
    const hrs = new Date().setHours(0, 0, 0, 0);
    const date = new Date(hrs);
    const today = moment().format();
    const dt = new Date(hrs);
    const td = new Date(hrs);
    const tommorrow = new Date(dt.setDate(dt.getDate()+1));
    const firstDay = moment(new Date(date.getFullYear(), new Date().getMonth(), 1)).format();
    const lastDay = moment(new Date(date.getFullYear(), new Date().getMonth() + 1, 0)).format();
    const startYear = moment(new Date(date.getFullYear(), 0, 1)).format();
    const dispatch = useDispatch();
    const { data } = useSelector(({ users: { currUser } }) =>currUser);
    const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);

    useEffect(() =>{
        (() =>{
            if(dataStock){
                setTotalSelled(dataStock.reduce((add, curr) => (parseFloat(add) + parseFloat(curr.amount || 0)), 0));
            }
        })()
    }, [dataStock]);

    useEffect(() =>{
        (() =>{
            switch(active){
                case 'year':
                    getSelledStocks(dataSt.id, agentId(data.Agents, dataSt.id), startYear, today)(dispatch);
                    break;
                case 'month':
                    getSelledStocks(dataSt.id, agentId(data.Agents, dataSt.id), firstDay, lastDay)(dispatch);
                    break;
                default:
                    getSelledStocks(dataSt.id, agentId(data.Agents, dataSt.id), moment(td).format(), moment(tommorrow).format())(dispatch);
                    console.log(tommorrow);
            }
        })()
    }, [dispatch, active]);

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
                    {selectValue === 'consumption' ? 'vente': selectValue==='all' ? 'tous': selectValue }
                </Button>
                <Picker
                    onValueChange={(value, index) =>setSelectedValue(value)}
                    selectedValue={selectValue}
                    style={{
                        display: 'none'
                    }}
                    ref={pickerRef}
                >
                    <Picker.Item key="a" label='Tous' value='all' />
                    <Picker.Item key="v" label='Vente' value='consumption' />
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
                    <TouchableOpacity style={[ styles.date, active === 'day' && {
                        backgroundColor: '#F27405'
                    } ]} onPress={() =>setActive('day')}>
                        <Text style={[
                            { textAlign: 'center', fontSize: 10 }
                        ]}>AJOURD'HUI</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blockStats}>
                <View>
                    <CircularProgress
                        maxValue={15000}
                        value={totalSelled}
                        textColor='#595859'
                        activeStrokeColor='#A65C02'
                        
                    />
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12
                    }} >LITRES VENDUS</Text>
                </View>

                <View>
                    <CircularProgress
                        maxValue={15000}
                        value={0}
                        textColor='#595859'
                        activeStrokeColor='#A65C02'
                        
                    />
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12
                    }}>BONUS VENDUS</Text>
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
        height: 200,
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
        borderRadius: 10,
        marginBottom: 20
    },
    // round: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 100,
    //     borderWidth: 6
    // }
})