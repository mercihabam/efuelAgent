import * as React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { color } from '../Themes/color';
import { createPdf } from './invoice';
import { createProof } from './rechargeProof';

export function SuccessModal({visible, setVisible, msg, navigation, trans, type}) {
  const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);

  const hideModal = () => {setVisible(false); navigation.navigate('dashboard')};
  const onSave = () =>{
    if(type){
      createProof(trans, dataSt.name);
    }else{
      createPdf(trans, dataSt.name);
    }
    navigation.navigate('dashboard')
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
              <Icon name='check' style={{
                  color: 'green',
                  textAlign: 'center'
              }} />
            <Text style={styles.modalTitle}> { msg } </Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={hideModal} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 20
              }}>
                  <Text style={{
                      color: color.red
                  }}> <Icon name='close' /> Fermer </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>onSave()} style={{
                  marginTop: 20,
                  marginLeft: 10,
                  borderColor: color.primary,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingBottom: 2,
                  paddingHorizontal: 5
              }}>
                  <Text style={{
                      color: color.primary
                  }}> <Icon name='download' /> Enregistrer </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollView>
      </Modal>
    </View>
  );
};

export function ErrorMsg({error}){

  return(
      <View style={{
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: color.red,
        borderWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    }}>
        <MIcon name='close' color='white' style={{ backgroundColor: color.red, borderRadius: 20, marginRight: 10 }} />
        <Text key={error} style={{
            color: '#c62828',
            
        }}> {error} </Text>
  </View>
  );
}

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
      marginTop: '50%'
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