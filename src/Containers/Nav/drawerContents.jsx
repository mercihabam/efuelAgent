import React from "react";
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import * as secureStore from 'expo-secure-store';
import { TOKEN_NAME } from 'env'
import { getCurrUser } from "../../Redux/actions/usersActions";

const menus = [
    {
        name: 'Dashboard',
        path: 'dashboard'
    },
    {
        name: 'Vendre',
        path: 'sell'
    },
    {
        name: 'Recharger',
        path: 'recharge'
    }
]

export function DrawerContents({navigation}){
    const { data } = useSelector(({ users: { currUser } }) =>currUser);
    const dispatch = useDispatch();
    const array = data.fullName.split(' ');
    let dataUser = '';
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        dataUser = dataUser + element.substr(0, 1)
    }

    const logout = () =>{
        secureStore.deleteItemAsync(TOKEN_NAME);
        getCurrUser(dispatch)
    };

    return(
        <View style={style.drawer}>
                <View style={style.content}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <View style={style.userInfo}>
                            <Text style={style.userAvatar}>{dataUser}</Text>
                        </View>
                    </View>
                    <View style={style.userDetails}>
                            <Caption style={{ color: 'white', fontSize: 15 }}> {data.fullName} </Caption>
                    </View>
                    <View style={style.menus}>
                        {
                            menus.map(menu =>(
                                <TouchableOpacity onPress={() => {navigation.navigate(menu.path); navigation.closeDrawer()}} key={menu.name} style={style.menu}>
                                    <Text style={{ color: 'white', fontSize: 16 }}> {menu.name}</Text>  
                                    <Icon name='chevron-right' color='white' size={20} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

            <Drawer.Section style={style.bottomDrawerSecion}>
                <TouchableOpacity onPress={logout} style={style.logout}>
                    <View><Icon name='exit-to-app' color='white' size={20} /></View>
                    <Text style={{ color: 'white', paddingLeft: 20 }}>Deconexion</Text>
                </TouchableOpacity>
            </Drawer.Section>
        </View>
    )
};

const style = StyleSheet.create({
    drawer: {
        flex: 1,
        color: 'white'
        // backgroundColor: '#595859'
    },
    content: {
        flex: 1,
        display: 'flex',
        marginTop: 50
    },
    bottomDrawerSecion: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    userInfo: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#F27405',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
    },
    userAvatar: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    userDetails: {
        display: 'flex',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: 'white'
    },
    logout: {
        display: 'flex',
        flexDirection: 'row'
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    menus: {
        paddingHorizontal: 40,
        marginTop: 50
    }
})