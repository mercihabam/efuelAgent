import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { rechargeAction } from "../../Redux/actions/transactions";
import { color } from "../../Themes/color";
import { QrScanner } from "./qrCodeScanner";
import { SellForm } from "./sellForm";

export function ChooseProduct({navigation}){
    const [dataScanned, setData] = useState('');
    const [viewScan, setViewScan] = useState();
    const [ amount, setAmount ] = useState();
    const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);
    const { msg, errorRecharge } = useSelector(({ transactions: { recharge } }) =>recharge);
    const dispatch = useDispatch();

    const onSell = () =>{
        if(amount && dataScanned){
            rechargeAction({
                to: dataScanned,
                amount: amount,
                from: dataSt.id
            })(dispatch, cb =>{
                if(cb === true){
                    navigation.navigate('dashboard')
                }
            })
        }else{
            console.log(amount, stk);
        }
    }

    return(
        <View>
            <View style={{
                marginTop: 40
            }}>
                <Icon name='wallet' style={{
                    fontSize: 100,
                    textAlign: 'center'
                }} />
            </View>

            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 50
            }}>
                {
                    dataScanned ? <SellForm amount={amount} onSubmit={onSell} setData={setData} setAmount={setAmount} />:
                    <>
                        <Text style={{
                        textAlign: 'center'
                    }}> Veuillez scanner le code QR de votre client pour lui transferer un montant </Text>
                    <TouchableOpacity onPress={() =>setViewScan(true)}>
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['#F27405', '#595859']}
                            style={styles.scanBtn}>
                            <Text style={{
                                color: 'white'
                            }}>Scanner QR Code</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {
                        viewScan && <QrScanner setViewScan={setViewScan} setData={setData} />
                    }
                    </>
                }
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    select: {
        backgroundColor: 'white',
        width: 150,
        borderRadius: 20,
        borderColor: color.orange,
        borderWidth: 1,
        marginTop: 10
        // marginLeft: 10
    },
    scanBtn: {
        width: 180,
        height: 45,
        marginTop: 80,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    }
})