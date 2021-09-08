import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { DrawerContents } from "../Containers/Nav/drawerContents";
import { NavHeader } from "../Containers/Nav/header";
import { withHeaderRoutes } from "../Utils/helpers";

const Drawer = createDrawerNavigator();

function Routes(){

    return(
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                header: ({navigation, routes, options}) =>(
                    <NavHeader navigation={navigation} />
                ),
                drawerStyle: {
                    backgroundColor: '#595859'
                }
            }} initialRouteName='Dashboard'  drawerContent={({state, navigation}) =>(
                <DrawerContents navigation={navigation} />
            )} >
                {
                    withHeaderRoutes.map(route =>(
                        <Drawer.Screen key={route.name} name={route.name}>
                            {() =>(
                                <route.component />
                            )}
                        </Drawer.Screen>
                    ))
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
};

export default Routes;