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
import { getCurrUser } from "../Redux/actions/usersActions";
import { color } from "../Themes/color";
import { getRoute, notProtectedRoutes, protectedRoutes, withHeaderRoutes } from "../Utils/helpers";

const Drawer = createDrawerNavigator();

function Routes(){
    const dispatch = useDispatch();
    const { loadingCurr, auth } = useSelector(({ users: { currUser } }) =>currUser);

    useEffect(() =>{
        getCurrUser(dispatch)
    }, [dispatch]);

    return(
        loadingCurr ?
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
                        activeRoute && activeRoute.withHeader ? <NavHeader navigation={navigation} />:
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
                        <Drawer.Screen key={route.name} name={route.name} component={route.component} />
                    )):<Drawer.Screen name='login' component={Login} />
                }
                {
                    notProtectedRoutes.map(route =>(
                        <Drawer.Screen key={route.name} name={route.name} component={route.component} />
                    ))
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
};

export default Routes;