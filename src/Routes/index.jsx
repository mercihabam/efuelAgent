import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { ActivityIndicator } from "react-native";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DrawerContents } from "../Containers/Nav/drawerContents";
import { NavHeader } from "../Containers/Nav/header";
import { Login } from "../Pages/User/login";
import { Signup } from "../Pages/User/signup";
import { getCurrStation } from "../Redux/actions/stationsActions";
import { getCurrUser } from "../Redux/actions/usersActions";
import { color } from "../Themes/color";
import { getRoute, notProtectedRoutes, protectedRoutes, withHeaderRoutes } from "../Utils/helpers";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { StartPage } from "../Pages/startPage";

const Drawer = createDrawerNavigator();

function Routes(){
    const dispatch = useDispatch();
    const { loadingCurr, auth } = useSelector(({ users: { currUser } }) =>currUser);
    const { loadingCurrSt } = useSelector(({ stations: {currStation} }) =>currStation);

    useEffect(() =>{
        getCurrUser(dispatch)
    }, [dispatch]);

    useEffect(() =>{
        (async()=>{
            const stationId = await SecureStore.getItemAsync('stationId');
            getCurrStation(stationId)(dispatch)
        })()
    }, [dispatch])

    return(
        <>
        <Toast ref={ref =>Toast.setRef(ref)} />
        {    loadingCurr ?
                <StartPage />:
            loadingCurrSt ?
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={70} color={color.orange} />
                </View>:
            <NavigationContainer>
                <Drawer.Navigator screenOptions={{
                    header: ({navigation, route, options}) =>{
                        const activeRoute = getRoute(route.name);
                        return (
                            activeRoute && activeRoute.withHeader ? <NavHeader route={route} navigation={navigation} />:
                            <StatusBar backgroundColor='black' />
                        )
                    },
                    drawerStyle: {
                        backgroundColor: '#595859',
                        opacity: !auth ? 0: 1
                    }
                }} initialRouteName='dashboard'  drawerContent={({state, navigation}) =>(
                    auth ? <DrawerContents navigation={navigation} />: null
                )} >
                    {
                        auth === true ?
                        protectedRoutes.map(route =>(
                            <Drawer.Screen options={{ unmountOnBlur: true }} key={route.name} name={route.name} component={route.component} />
                        )):<>
                            <Drawer.Screen options={{ unmountOnBlur: true }} name='login' component={Login} />
                            <Drawer.Screen options={{ unmountOnBlur: true }} name='signup' component={Signup} />
                        </>
                    }
                    {
                        notProtectedRoutes.map(route =>(
                            <Drawer.Screen options={{ unmountOnBlur: true }} key={route.name} name={route.name} component={route.component} />
                        ))
                    }
                </Drawer.Navigator>
            </NavigationContainer>}
        </>
    )
};

export default Routes;