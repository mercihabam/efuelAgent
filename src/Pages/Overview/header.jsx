import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Caption } from "react-native-paper";
import { useSelector } from 'react-redux';

export function OverHeader(){
    const { data } = useSelector(({ users: { currUser } }) =>currUser);

    return(
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avText}>MJ</Text>
            </View>
            <View>
                <Caption>Agent</Caption>
                <Text>{data.fullName}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20
    },
    avatar: {
        backgroundColor: '#595859',
        borderWidth: 3,
        borderColor: '#F27405',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 10
    },
    avText: {
        color: 'white'
    }
})