import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../../Redux/actions/usersActions';
import { Button } from 'react-native-paper';
import { color } from '../../Themes/color';
import { ErrorMsg } from '../../Utils/messages';

export function Signup({navigation}){
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector(({ users: {signup} }) =>signup);

    const submit = () =>{
        signupAction({
            fullName: name,
            email: email,
            password: pwd,
            confirmPassword: confirm,
            lat: 0.0233,
            long: 1.00000000049,
            phone: phone
        })(dispatch, navigation);
    };

    const errors = error ? error.split(','): [];

    return(
        <ScrollView style={{
            flex: 1
        }} contentContainerStyle={styles.container}>
            <View style={styles.intro}>
                <Text style={styles.title}>Insrcivez-vous sur</Text>
                <Text style={styles.name}>E-FuelPoint</Text>
            </View>
            <View style={styles.inputs}>
                <View style={{ marginBottom: 10, marginTop: 20 }}>
                    {
                        errors.map(err =>(
                            <ErrorMsg error={err} key={err} />
                        ))
                    }
                </View>
                <TextInput onChangeText={setName} style={styles.input} placeholder='Nom complet' />
                <TextInput onChangeText={setEmail} keyboardType="email-address" style={styles.input} placeholder='Email' />
                <TextInput onChangeText={setPhone} keyboardType='phone-pad' style={styles.input} placeholder='Numéro de téléphone' />
                <TextInput style={styles.input} onChangeText={setPwd} secureTextEntry={true} keyboardType='numeric' placeholder='Code secret à 4 chiffres' textContentType='password' />
                <TextInput style={styles.input} onChangeText={setConfirm} secureTextEntry={true} keyboardType='numeric' placeholder='Confirmer le code secret' textContentType='password' />
                <Button color='white' loading={loading} onPress={submit} block style={styles.button}  >
                    s'incrire
                </Button>
                <Text style={{
                    textAlign: 'center',
                    color: color.orange,
                    marginTop: 10
                }} onPress={() =>navigation.navigate('login')}>Connexion</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '13%',
        paddingBottom: 80
    },
    intro: {
        width: '75%'
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