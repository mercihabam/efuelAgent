import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../Redux/actions/usersActions';
import { Button } from 'react-native-paper';
import { color } from '../../Themes/color';

export function Login({navigation}){
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector(({ users: { login } }) =>login)

    const submit = () =>{
        loginAction({
            id: id,
            password: pwd
        })(dispatch, navigation)
    };

    const errors = error.split(',');

    return(
        <View style={styles.container}>
            <View style={styles.intro}>
                <Text style={styles.title}>Bienvenue sur</Text>
                <Text style={styles.name}>E-FuelPoint</Text>
            </View>
            <View style={styles.inputs}>
                <View style={{ marginBottom: 20 }}>
                    {
                        errors.map(err =>(
                            <Text style={{
                                color: '#c62828'
                            }}> {err} </Text>
                        ))
                    }
                </View>
                <TextInput onChangeText={setId} style={styles.input} placeholder='Email ou numero de telephone' />
                <TextInput style={styles.input} onChangeText={setPwd} secureTextEntry={true} placeholder='Mot de passe' textContentType='password' />
                <Button color='white' loading={loading} onPress={submit} block style={styles.button}  >
                    se connecter
                </Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        flex: 0,
        height: '30%',
        width: '75%',
        marginTop: -100
    },
    inputs: {
        width: '75%'
    },
    input: {
        borderColor: '#595859',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F27405'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#595859'
    },
    button: {
        backgroundColor: color.dark,
        color: 'white',
        borderRadius: 30
    }
})