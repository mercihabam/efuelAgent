import React from "react"
// import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { StyleSheet } from "react-native"
import { color } from "../../Themes/color"
import { StatusBar } from "react-native"
import { Text } from "react-native"
import Icon  from "react-native-vector-icons/MaterialCommunityIcons"

const LeftContent = () =>{

    return(
        <View style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
    )
};

const RightContent = ({onClick}) =>{

    return(
        <View style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Icon onPress={onClick} style={styles.menuIcon} name='menu' />
        </View>
    )
};

export function NavHeader({navigation}){

    return(
        <View>
            <StatusBar translucent={true} backgroundColor='black' />
            <Header
                placement="left"
                leftComponent={<LeftContent />}
                rightComponent={<RightContent onClick={() =>navigation.openDrawer()} />}
                backgroundColor='white'
                containerStyle={styles.header}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: color.orange,
        height: 20,
        color: 'black'
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 5
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.orange
    },
    menuIcon: {
        color: 'black',
        fontSize: 30
    }
})