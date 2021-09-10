import React from "react"
import { View } from "react-native"
import { Header } from "react-native-elements"
import { StyleSheet } from "react-native"
import { color } from "../../Themes/color"
import { StatusBar } from "react-native"
import { Text } from "react-native"
import Icon  from "react-native-vector-icons/MaterialCommunityIcons"
import { getRoute } from "../../Utils/helpers"

const LeftContent = ({route}) =>{

    return(
        <View style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Text style={styles.headerTitle}>{ getRoute(route.name).title }</Text>
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

export function NavHeader({navigation, route}){

    return(
        <View>
            <StatusBar backgroundColor='black' />
            <Header
                placement="left"
                leftComponent={<LeftContent route={route} />}
                rightComponent={<RightContent onClick={() =>navigation.openDrawer()} />}
                backgroundColor='black'
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