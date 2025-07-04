import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { ConfirmModal } from '../../Utils/confirmPwd';

export function SellForm({setData, setAmount, onSubmit, amount}){
    const { loadingRecharge } = useSelector(({ transactions: { recharge } }) =>recharge);
    const [visible, setVisible] = useState(false);

    const viewConfirm = () =>{
        if(amount){
            setVisible(true)
        }
    }

    return(
        <View style={{
            alignItems: 'center'
        }}>
            <TextInput keyboardType='number-pad'  onChangeText={setAmount} style={styles.input} placeholder='Entrer le montant' />
            <TouchableOpacity disabled={loadingRecharge} onPress={viewConfirm}>
                <LinearGradient
                    colors={['#F27405', '#595859']}
                    style={styles.sellBtn}>
                    {
                        loadingRecharge ?
                        <ActivityIndicator color='white' />:
                        <Text style={{
                            color: 'white'
                        }}>Envoyer</Text>
                    }
                </LinearGradient>
            </TouchableOpacity>
            <Text style={{
                    textAlign: 'center',
                    color: '#039be5',
                    marginTop: 40
                }} onPress={() =>setData(null)}>Scanner encore</Text>
            <ConfirmModal visible={visible} setVisible={setVisible} cb={onSubmit} />
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        borderColor: '#595859',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingVertical: 10,
        width: 250
    },
    sellBtn: {
        width: 180,
        height: 45,
        marginTop: 10,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    }
})