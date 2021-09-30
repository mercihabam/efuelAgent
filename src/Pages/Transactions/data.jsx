import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FacebookLoader } from 'react-native-easy-content-loader';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export function TransData(){
    const { rowsTrans, loadingTrans } = useSelector(({ transactions: {transactions} }) =>transactions);

    return(
        <View style={{
            marginTop: 20
        }}>
            {
                loadingTrans ?
                <View>
                    <FacebookLoader active loading={true} />
                    <FacebookLoader active loading={true} />
                    <FacebookLoader active loading={true} />
                </View>:
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
                            {moment(trans.createdAt).fromNow()}
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
                            {moment(trans.createdAt).fromNow()}
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
                            {moment(trans.createdAt).fromNow()}
                        </Text>
                    </View>
                ))
            }
        </View>
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