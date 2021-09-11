import { BarCodeScanner } from 'expo-barcode-scanner';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { base64Tostr } from '../../Utils/helpers';

export function QrScanner({setViewScan, setData}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const requestCameraPermission = async() =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        console.log(status);
    };

    useEffect(() =>{
        requestCameraPermission()
    });

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const str = base64Tostr(data)
        setData(str);
        setViewScan(false)
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return(
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    //   backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -70
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
    }
  });