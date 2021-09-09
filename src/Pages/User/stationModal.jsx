import * as React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../Themes/color';
import * as SecureStore from 'expo-secure-store';
import { getCurrStation } from '../../Redux/actions/stationsActions';
import { getCurrUser } from '../../Redux/actions/usersActions';
import { TOKEN_NAME } from 'env';

export function ModalStation({visible, setVisible}) {

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, width: '90%', marginLeft: '5%', borderRadius: 20 };
  const { data, token } = useSelector(({ users: { login } }) =>login);
  const dispatch = useDispatch();

  const onSelect = (stationId) =>{
        SecureStore.setItemAsync(TOKEN_NAME, token);
        SecureStore.setItemAsync('stationId', stationId);
        getCurrStation(stationId)(dispatch);
        getCurrUser(dispatch)
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          hideModal()
        }}
      >
        <ScrollView contentContainerStyle={[styles.centeredView, {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }]}>
          <ScrollView style={{
              flex: 1
          }} contentContainerStyle={styles.modalView}>
            <Text style={styles.modalText}> Bienvenue { data.fullName } </Text>
            <Text>Connectez-vous avec votre station</Text>
            <View style={styles.blockStations}>
                {
                    data.Stations.map(station =>(
                        <TouchableOpacity key={station.id} onPress={()=>onSelect(station.id)} style={styles.station}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                St. {station.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
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