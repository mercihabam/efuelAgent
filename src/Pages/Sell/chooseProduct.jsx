import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../Redux/actions/stocksActions";
import { sellAction } from "../../Redux/actions/transactions";
import { color } from "../../Themes/color";
import { createPdf } from "../../Utils/invoice";
import { SuccessModal } from "../../Utils/messages";
import { QrScanner } from "./qrCodeScanner";
import { SellForm } from "./sellForm";

export function ChooseProduct({navigation}){
    const [selectValue, setSelectedValue] = useState('');
    const [dataScanned, setData] = useState('');
    const [viewScan, setViewScan] = useState();
    const pickerRef = React.createRef();
    const [ amount, setAmount ] = useState();
    const {dataStocks, loadingStocks} = useSelector(({ stocks: {stocks} }) =>stocks);
    const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);
    const { msg, errorSell } = useSelector(({ transactions: { sell } }) =>sell);
    const dispatch = useDispatch();
    const stk = selectValue ? JSON.parse(selectValue): { name: '', id: '' };
    const [ success, setSuccess ] = useState(false);
    const { data } = useSelector(({ transactions: { sell } }) =>sell);

    useEffect(() =>{
        getStocks(dataSt.id)(dispatch)
    }, [dispatch]);

    const onSell = () =>{
        if(amount && stk.id){
            sellAction({
                userId: dataScanned,
                stockId: stk.id.toString(),
                amount: amount,
                stationId: dataSt.id
            })(dispatch, cb =>{
                if(cb === true){
                    setSuccess(true)
                }
            })
        }
    }

    return(
        <View>
            <SuccessModal trans={data} visible={success} navigation={navigation} setVisible={setSuccess} msg="Transaction effectuée avec succès, Voulez-vous enregistrer la preuve ?" />
            <View style={{
                marginTop: 40
            }}>
                <Icon name='gas-pump' style={{
                    fontSize: 100,
                    textAlign: 'center'
                }} />
            </View>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
            }}>
                <Text style={{
                    fontWeight: '600',
                    textAlign: 'center'
                }}>Selectionner un produit</Text>
                <Button
                    color="#F27405"
                    style={styles.select}
                    disabled={loadingStocks}
                    icon='chevron-down'
                    uppercase={false}
                    loading={loadingStocks}
                    onPress={() =>pickerRef.current.focus()}
                >
                    {stk.name}
                </Button>
                <Picker
                    onValueChange={(value) =>setSelectedValue(value)}
                    selectedValue={selectValue}
                    style={{
                        display: 'none'
                    }}
                    ref={pickerRef}
                >
                    <Picker.Item key='f' style={{
                        color: 'rgba(0, 0, 0, 0.5)'
                    }} label='choisir le stock' value='' disabled />
                    {
                        dataStocks.map(stock =>(
                            <Picker.Item key={stock.id} label={stock.name} value={JSON.stringify(stock)} />
                        ))
                    }
                </Picker>
            </View>

            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 50
            }}>
                {
                    dataScanned ? <SellForm amount={amount} stock={stk.id} onSubmit={onSell} setData={setData} setAmount={setAmount} />:
                    <>
                        <Text style={{
                        textAlign: 'center'
                    }}> Veuillez scanner le code QR de votre client pour transferer une quantité de votre stock </Text>
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