import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from "../../Themes/color";
import { base64Tostr } from "../../Utils/helpers";
import { QrScanner } from "./qrCodeScanner";

export function ChooseProduct(){
    const [selectValue, setSelectedValue] = useState('Essence');
    const [dataScanned, setData] = useState('');
    const [viewScan, setViewScan] = useState();
    const pickerRef = React.createRef();

    return(
        <View>
            <View style={{
                marginTop: 40
            }}>
                <Icon name='gas-pump' style={{
                    fontSize: 100,
                    textAlign: 'center'
                }} />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
            }}>
                <Text style={{
                    fontWeight: '600'
                }}>Selectionner un produit</Text>
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
                    <Picker.Item key="a" label='Essence' value='Essence' />
                    <Picker.Item key="v" label='Mazout' value='Mazout' />
                    <Picker.Item key='r' label='Kerozene' value='Kerozene' />
                </Picker>
            </View>

            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 50
            }}>
                <Text style={{
                    textAlign: 'center'
                }}> Veuillez scanner le code QR de votre client pour transferer une quantité de votre stock </Text>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
                    style={styles.background}
                />
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#F27405', '#595859']}
                    style={styles.scanBtn}>
                    <Text onPress={() =>setViewScan(true)} style={{
                        color: 'white'
                    }}>Scanner QR Code</Text>
                </LinearGradient>
                {
                    viewScan && <QrScanner setViewScan={setViewScan} setData={setData} />
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
        marginLeft: 10
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