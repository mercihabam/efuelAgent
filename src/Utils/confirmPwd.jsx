import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { color } from '../Themes/color';
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as secureStore from 'expo-secure-store'
import { ActivityIndicator } from 'react-native';
import { ErrorMsg } from './messages';

export function ConfirmModal({visible, setVisible, cb, text="Veuillez confirmer votre code secret pour executer l'opération", user}) {
    const [ pwd, setPwd ] = useState();
    const [loading, setLoading] = useState();
    const [msg, setMsg] = useState();

    const hideModal = () => setVisible(false);

    const submit = async() =>{
        if(pwd){
            try {
                setLoading(true);
                setMsg(null)
                const token = await secureStore.getItemAsync(TOKEN_NAME);
                const url = user ? `${SERVER_URL}/users/confirm-password?userId=${user.id}`: `${SERVER_URL}/users/confirm-password`
                const res = await axios.post(url, {
                    password: pwd
                }, {
                    headers: {
                        'e-fuel-authtoken': token
                    }
                });
                if(res.status === 200){
                    setLoading(false);
                    cb();
                    hideModal();
                }
            } catch (error) {
                setLoading(false);
                const res = error.response;
                if(res){
                    setMsg(res.data.error || 'Code secret incorrect')
                }else{
                    setMsg('Veuillez reesayer')
                }
            }
        }
    }

    return (
        <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
            hideModal()
            }}
        >
            <ScrollView contentContainerStyle={[styles.centeredView, {
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }]}>
            <ScrollView style={{
                flex: 1
            }} contentContainerStyle={styles.modalView}>
                <Text style={styles.modalTitle}> { text } </Text>
                <View>
                    {
                        msg && <ErrorMsg error={msg} />
                    }
                    <TextInput secureTextEntry keyboardType='numeric'  onChangeText={setPwd} style={styles.input} placeholder='****' />
                </View>
                <View style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 20
                }}>
                    <TouchableOpacity onPress={hideModal} style={{
                        padding: 10
                    }}>
                        <Text style={{
                            color: color.red
                        }}> <Icon name='close' /> Annuler </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: 10,
                        borderColor: color.orange,
                        borderWidth: 1,
                        borderRadius: 20
                    }}
                    onPress={() =>{ !loading && submit() }}
                    >
                        <Text style={{ color: color.orange }}>{
                            loading && <ActivityIndicator color={color.orange} />} Verifier</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ScrollView>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      display: 'flex',
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
        borderColor: '#595859',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingVertical: 10,
        width: 250
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: '30%'
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 16
    },
    blockStations: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    station: {
        backgroundColor: color.dark,
        padding: 20,
        borderRadius: 10,
        borderColor: color.orange,
        borderWidth: 2,
        justifyContent: 'center',
        marginBottom: 10
    }
  });