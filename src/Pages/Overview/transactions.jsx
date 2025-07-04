import React from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import moment from 'moment';
import fr from 'moment/locale/fr';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import { getTransactions } from '../../Redux/actions/transactions';
import { useDispatch, useSelector } from 'react-redux';
import { agentId } from '../../Utils/helpers';
import Loader, { FacebookLoader } from 'react-native-easy-content-loader';
import { TouchableOpacity } from 'react-native';

const trs = [
    {
        Client: {
            fullName: 'Merci Jacob'
        },
        amount: 5,
        type: 'consumption',
        stock: { name: 'Essence' }
    },
    {
        Receiver: {
            fullName: 'Merci Jacob'
        },
        amount: 11,
        type: 'recharge'
    }
]

export function Transactions({type, navigation}){
    const { data } = useSelector(({ users: { currUser } }) =>currUser);
    const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);
    const { rowsTrans, countTrans, loadingTrans } = useSelector(({ transactions: {transactions} }) =>transactions);
    const dispatch = useDispatch();
    const rKey = navigation.getState().history[0].key

    useEffect(() =>{
        getTransactions(dataSt.id, agentId(data.Agents, dataSt.id), 0, 5, type)(dispatch)
    }, [data, dataSt, type, rKey])

    return(
        <ScrollView style={styles.container}>
            {
                loadingTrans ?
                <View>
                    <FacebookLoader active loading={true} />
                    <FacebookLoader active loading={true} />
                    <FacebookLoader active loading={true} />
                </View>:
                <View>
                    {
                        rowsTrans.map(trans =>(
                            trans.type === 'consumption' ?
                            <View 
                            key={trans.id}
                            style={[
                                styles.trans,
                                {
                                    backgroundColor: '#E8F5E9'
                                }
                            ]}
                            px={20}
                            py={5} 
                            bg={trans.type === 'consumption' ? 'green100': 'yellow100' }
                            mb={10}
                            className='View-trans'
                            hoverBg={trans.type === 'consumption' ? 'green300': 'yellow300' }
                            >
                                <View style={styles.infos}>
                                    <View style={styles.transIcon}>
                                        <Icon name='arrow-down' style={{
                                            fontSize: 20,
                                            color: 'green'
                                        }} />
                                    </View>
                                    <View>
                                        <Text style={styles.client} className="trans-client"> {trans.Client.fullName} </Text>
                                        {
                                            trans.stock && 
                                            <Text className="trans-stock"> stock: {trans.stock.name} </Text>
                                        }
                                        <Text className="trans-amount">montant: {trans.amount} </Text>
                                    </View>
                                    <View className="trans-type">
                                    </View>
                                </View>
                                <Text style={styles.date}>
                                    {moment(trans.createdAt).locale('fr', fr).fromNow()}
                                </Text>
                            </View>:
                            trans.type === 'recharge' ?
                            <View 
                            style={[
                                styles.trans,
                                {
                                    backgroundColor: "#fff8e1"
                                }
                            ]}
                            px={20}
                            py={5}  
                            bg='yellow100'
                            mb={10}
                            className='View-trans'
                            hoverBg='yellow300'
                            >
                                <View style={styles.infos}>
                                    <View style={styles.transIcon}>
                                        <Icon name='arrow-up' style={{
                                            fontSize: 20,
                                            color: 'chocolate'
                                        }} />
                                    </View>
                                    <View>
                                        <Text style={styles.client}> {trans.Receiver.fullName} </Text>
                                        {
                                            trans.stock && 
                                            <Text className="trans-stock"> stock: {trans.stock.name} </Text>
                                        }
                                        <Text>montant: {trans.amount} </Text>
                                    </View>
                                    <View className="trans-type">
                                    </View>
                                </View>
                                <Text style={styles.date}>
                                    {moment(trans.createdAt).locale('fr', fr).fromNow()}
                                </Text>
                            </View>:
                            <View 
                            style={[
                                styles.trans,
                                {
                                    backgroundColor: "#fffde7"
                                }
                            ]}
                            px={20}
                            py={5}  
                            bg='yellow100'
                            mb={10}
                            className='View-trans'
                            hoverBg='yellow300'
                            >
                                <View style={styles.infos}>
                                    <View style={styles.transIcon}>
                                        <Icon name='gift-outline' style={{
                                            fontSize: 20,
                                            color: 'chocolate'
                                        }} />
                                    </View>
                                    <View>
                                        <Text style={styles.client}> {trans.Receiver.fullName} </Text>
                                        {
                                            trans.stock && 
                                            <Text className="trans-stock"> stock: {trans.stock.name} </Text>
                                        }
                                        <Text>montant: {trans.amount} </Text>
                                    </View>
                                    <View className="trans-type">
                                    </View>
                                </View>
                                <Text style={styles.date}>
                                    {moment(trans.createdAt).locale('fr', fr).fromNow()}
                                </Text>
                            </View>
                        ))
                    }
                    {
                        countTrans > 5 &&
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('transactions')}>
                                <Text style={{
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    textAlign: 'right', 
                                    paddingHorizontal: 20,
                                    marginTop: 20
                                }}>Voir plus <AntIcon name='right' /> </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        paddingVertical: 20,
        marginBottom: 50
    },
    trans: {
        borderColor: '#cbd5e0',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 20
    },
    infos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    date: {
        fontSize: 12,
        color: '#a0aec0'
    },
    client: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    transIcon: {
        marginRight: 15
    }
})