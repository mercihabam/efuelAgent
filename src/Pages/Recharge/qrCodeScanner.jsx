import { BarCodeScanner } from 'expo-barcode-scanner';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { base64Tostr } from '../../Utils/helpers';
import { ResultModal } from '../../Utils/messages';
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as secureStore from 'expo-secure-store'
import axios from 'axios';

export function QrScanner({setViewScan, setData}){
    const [hasPermission, setHasPermission] = useState(null);
    const [success, setSuccess] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ user, setUser ] = useState({});

    const requestCameraPermission = async() =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() =>{
        requestCameraPermission()
    });

    const serachUser = async(userId) =>{
      try {
          setLoading(true);
          setSuccess(true)
          const token = await secureStore.getItemAsync(TOKEN_NAME);
          const url =  `${SERVER_URL}/users/${userId}`
          const res = await axios.get(url, {
              headers: {
                  'e-fuel-authtoken': token
              }
          });
          if(res.status === 200){
              setUser(res.data.data);
              setLoading(false)
          }
      } catch (error) {
          setLoading(false);
          setSuccess(false)
          console.error(JSON.stringify(error.response));
          const res = error.response;
          if(res){
              Alert.alert('Echec', 'Utilisateur introuvable')
          }else{
              Alert.alert('Echec', 'Veuillez reesayer')
          }
      }
  }

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      const str = base64Tostr(data)
      serachUser(str)
    };

    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    const hideModal =() =>{
      setData(user.id);
      setSuccess(true)
    }

    return(
        <View style={styles.container}>
            <ResultModal data={user} loading={loading} visible={success} hide={hideModal}  />
              <View style={styles.barcodebox}>
                {
                  !scanned && <BarCodeScanner
                  onBarCodeScanned={handleBarCodeScanned}
                  style={{ height: 400, width: 400 }}
              />
                }
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